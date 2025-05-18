import { ObjectId } from "mongodb";
import { errors } from "../constants/errors";
import {
    aggregateJobOrderRepo,
    createJobOrderRepo,
    findAllJobOrderRepo,
    findLastAddedJobOrderRepo,
    findOneJobOrderRepo,
} from "../repositories/jobOrder.repository";

export const createJobOrderService = async (data: any) => {
    try {
        const { foreignAgent, issuedDate, expiredDate } = data;

        const existingJobOrders = await findAllJobOrderRepo({
            foreignAgent: new ObjectId(foreignAgent),
            jobOrderStatus: { $in: ["ACTIVE", "PENDING"] },
        });

        if (existingJobOrders.length > 0) {
            throw new Error(errors.FOREIGN_AGENT_HAS_ACTIVE_JOB_ORDER);
        }

        data.jobOrderStatus = await fetchJobOrderStatus(
            issuedDate,
            expiredDate
        );

        data.jobOrderId = await generateJobOrderId();

        return await createJobOrderRepo(data);
    } catch (e) {
        console.error("Job Order creation error:", e);
        throw e;
    }
};

const generateJobOrderId = async () => {
    try {
        const lastAdded = await findLastAddedJobOrderRepo();

        if (!lastAdded || !lastAdded.jobOrderId) {
            return "LFA-0001";
        }

        const lastId = lastAdded.jobOrderId;
        const match = lastId.match(/^LJO-(\d{4})$/);

        if (!match) {
            return "LJO-0001";
        }

        const numericPart = parseInt(match[1], 10);
        const nextNumber = numericPart + 1;
        return `LJO-${nextNumber.toString().padStart(4, "0")}`;
    } catch (e) {
        console.error("Error generating ForeignAgent ID:", e);
        throw e;
    }
};

export const getPagedJobOrderService = async (data: any) => {
    try {
        const { pageSize, page, searchQuery, foreignAgent, jobOrderStatus } =
            data.filters;
        const skip = (page - 1) * pageSize;
        const matchStage: any = {};

        if (searchQuery) {
            matchStage.$or = [
                { jobOrderId: { $regex: searchQuery, $options: "i" } },
                {
                    jobOrderApprovalNumber: {
                        $regex: searchQuery,
                        $options: "i",
                    },
                },
            ];
        }

        if (jobOrderStatus) {
            matchStage.jobOrderStatus = jobOrderStatus;
        }

        if (foreignAgent) {
            matchStage.foreignAgent = new ObjectId(foreignAgent);
        }

        const pipeline: any[] = [];

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }

        pipeline.push(
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $lookup: {
                    as: "foreignAgentData",
                    from: "foreign_agents",
                    foreignField: "_id",
                    localField: "foreignAgent",
                },
            },
            {
                $unwind: {
                    path: "$foreignAgentData",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [{ $skip: skip }, { $limit: pageSize }],
                },
            },
            {
                $unwind: {
                    path: "$metadata",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    "metadata.pageIndex": page,
                },
            },
            {
                $project: {
                    total: "$metadata.total",
                    pageIndex: "$metadata.pageIndex",
                    result: "$data",
                },
            }
        );

        const result = await aggregateJobOrderRepo(pipeline);
        return result[0] || { total: 0, pageIndex: page, result: [] };
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getAllJobOrderService = async (data: any) => {
    try {
        const { filters } = data;
        return await findAllJobOrderRepo(filters);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getOneAggregateJobOrderService = async (id: any) => {
    try {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "foreign_agents",
                    localField: "foreignAgent",
                    foreignField: "_id",
                    as: "foreignAgentData",
                },
            },
            {
                $unwind: {
                    path: "$foreignAgentData",
                    preserveNullAndEmptyArrays: true,
                },
            },

            {
                $lookup: {
                    from: "countries",
                    localField: "foreignAgentData.country",
                    foreignField: "_id",
                    as: "foreignAgentData.countryData",
                },
            },
            {
                $unwind: {
                    path: "$foreignAgentData.countryData",
                    preserveNullAndEmptyArrays: true,
                },
            },

            // Unwind jobs array to lookup jobCatalogData
            { $unwind: { path: "$jobs", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "job_catalogs",
                    localField: "jobs.jobCatalogId",
                    foreignField: "_id",
                    as: "jobs.jobCatalogData",
                },
            },
            {
                $unwind: {
                    path: "$jobs.jobCatalogData",
                    preserveNullAndEmptyArrays: true,
                },
            },

            // Group back to reconstruct jobs array
            {
                $group: {
                    _id: "$_id",
                    doc: { $first: "$$ROOT" },
                    jobs: { $push: "$jobs" },
                },
            },
            {
                $addFields: {
                    "doc.jobs": "$jobs",
                },
            },
            {
                $replaceRoot: {
                    newRoot: "$doc",
                },
            },
        ];
        const result = await aggregateJobOrderRepo(pipeline);
        return result[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updateJobOrderService = async (id: any, data: any) => {
    try {
        const { issuedDate, expiredDate } = data;
        const existJobOrder: any = await findOneJobOrderRepo({
            _id: new ObjectId(id),
        });

        if (existJobOrder) {
            throw new Error(errors.INVALID_JOB_ORDER);
        }

        if (
            existJobOrder.jobOrderStatus === "ACTIVE" ||
            existJobOrder.jobOrderStatus === "EXPIRED"
        ) {
            throw new Error(errors.CANNOT_EDIT_ACTIVE_OR_EXPIRE_JOB_ORDERS);
        }

        data.jobOrderStatus = await fetchJobOrderStatus(
            issuedDate,
            expiredDate
        );
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const fetchJobOrderStatus = async (issuedDate: any, expiredDate: any) => {
    try {
        const today = new Date();
        const issued = new Date(issuedDate);
        const expired = new Date(expiredDate);

        if (today < issued) {
            return "PENDING";
        } else if (today >= issued && today <= expired) {
            return "ACTIVE";
        }
        return "EXPIRED";
    } catch (e) {
        console.error(e);
        throw e;
    }
};
