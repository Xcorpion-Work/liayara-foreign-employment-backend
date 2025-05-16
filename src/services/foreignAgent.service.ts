import {
    aggregateForeignAgentRepo,
    createForeignAgentRepo,
    findLastAddedForeignAgentRepo,
    findOneForeignAgentRepo,
    updateForeignAgentRepo,
} from "../repositories/foreignAgent.repository";
import { errors } from "../constants/errors";
import mongoose from "mongoose";
import { findAllPassengerRepo } from "../repositories/passenger.repository";

const ObjectId = mongoose.Types.ObjectId;

export const createForeignAgentService = async (data: any) => {
    try {
        const existingForeignAgent = await findOneForeignAgentRepo({
            phone: data?.phone,
        });

        if (existingForeignAgent) {
            throw new Error(errors.FOREIGN_AGENT_ALREADY_EXIST);
        }

        data.foreignAgentId = await generateForeignAgentId();
        return await createForeignAgentRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const generateForeignAgentId = async () => {
    try {
        const lastAdded = await findLastAddedForeignAgentRepo();

        if (!lastAdded || !lastAdded.foreignAgentId) {
            return "LFA-0001";
        }

        const lastId = lastAdded.foreignAgentId;
        const match = lastId.match(/^LFA-(\d{4})$/);

        if (!match) {
            return "LFA-0001";
        }

        const numericPart = parseInt(match[1], 10);
        const nextNumber = numericPart + 1;
        return `LFA-${nextNumber.toString().padStart(4, "0")}`;
    } catch (e) {
        console.error("Error generating ForeignAgent ID:", e);
        throw e;
    }
};

export const getPagedForeignAgentService = async (data: any) => {
    try {
        const { pageSize, page, searchQuery, status } = data.filters;
        const skip = (page - 1) * pageSize;
        const matchStage: any = {};

        if (searchQuery) {
            matchStage.$or = [
                { name: { $regex: searchQuery, $options: "i" } },
                { foreignAgentId: { $regex: searchQuery, $options: "i" } },
                { phone: { $regex: searchQuery, $options: "i" } },
                { email: { $regex: searchQuery, $options: "i" } },
            ];
        }

        if (status) {
            matchStage.status = status === "ACTIVE";
        }

        const pipeline: any[] = [];

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }

        pipeline.push(
            { $sort: { createdAt: -1 } },
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

        const result = await aggregateForeignAgentRepo(pipeline);
        return result[0] || { total: 0, pageIndex: page, result: [] };
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getOneAggregateForeignAgentService = async (id: any) => {
    try {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
            {
                $lookup: {
                    as: "countryData",
                    from: "countries",
                    foreignField: "_id",
                    localField: "country",
                },
            },
            {
                $unwind: {
                    path: "$countryData",
                    preserveNullAndEmptyArrays: true,
                },
            },
        ];

        const result = await aggregateForeignAgentRepo(pipeline);
        return result[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updateForeignAgentService = async (id: any, data: any) => {
    try {
        const foreignAgent = await findOneForeignAgentRepo({
            _id: new ObjectId(id),
        });

        if (!foreignAgent) {
            throw new Error(errors.INVALID_FOREIGN_AGENT);
        }

        const existingForeignAgent = await findOneForeignAgentRepo({
            phone: data.phone,
        });

        if (
            existingForeignAgent &&
            existingForeignAgent._id.toString() !== id
        ) {
            throw new Error(errors.FOREIGN_AGENT_ALREADY_EXIST);
        }

        if (data?.status === false) {
            // set for job active job orders
            const passengers = await findAllPassengerRepo({
                foreignAgent: new ObjectId(id),
                status: true,
            });

            if (passengers.length > 0) {
                throw new Error(errors.FOREIGN_AGENT_CANNOT_BE_DEACTIVATED);
            }
        }

        return await updateForeignAgentRepo({ _id: new ObjectId(id) }, data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};
