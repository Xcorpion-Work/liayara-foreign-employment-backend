import {
    aggregateSubAgentRepo,
    createSubAgentRepo,
    findOneSubAgentRepo,
    updateSubAgentRepo,
} from "../repositories/subAgent.repository";
import { errors } from "../constants/errors";
import mongoose from "mongoose";
import { findAllPassengerRepo } from "../repositories/passenger.repository";

const ObjectId = mongoose.Types.ObjectId;

export const createSubAgentService = async (data: any) => {
    try {
        const existingSubAgent = await findOneSubAgentRepo({
            phone: data?.phone,
        });

        if (existingSubAgent) {
            throw new Error(errors.SUB_AGENT_ALREADY_EXIST);
        }
        return await createSubAgentRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getPagedSubAgentService = async (data: any) => {
    try {
        const { pageSize, page, searchQuery, status } = data.filters;
        const skip = (page - 1) * pageSize;
        const matchStage: any = {};

        if (searchQuery) {
            matchStage.$or = [
                { name: { $regex: searchQuery, $options: "i" } },
                {
                    phone: {
                        $regex: searchQuery,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: searchQuery,
                        $options: "i",
                    },
                },
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
            {
                $sort: { createdAt: -1 },
            },
            // {
            //     as: "passengers",
            //     from: "passengers",
            //     foreignField: "subAgent",
            //     localField: "_id"
            // },
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
        const subAgents = await aggregateSubAgentRepo(pipeline);

        return subAgents[0] || { total: 0, pageIndex: page, result: [] };
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getOneAggregateSubAgentService = async (id: any) => {
    try {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
            // {
            //     as: "passengers",
            //     from: "passengers",
            //     foreignField: "subAgent",
            //     localField: "_id"
            // },
        ];

        const result = await aggregateSubAgentRepo(pipeline);
        return result[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updateSubAgentService = async (id: any, data: any) => {
    try {
        const subAgent = await findOneSubAgentRepo({ _id: new ObjectId(id) });

        if (!subAgent) {
            throw new Error(errors.INVALID_SUB_AGENT);
        }

        const existingSubAgent = await findOneSubAgentRepo({
            phone: data.phone,
        });

        if (existingSubAgent && existingSubAgent._id.toString() !== id) {
            throw new Error(errors.SUB_AGENT_ALREADY_EXIST);
        }

        if (data?.status === false) {
            const passengers = await findAllPassengerRepo({
                subAgent: new ObjectId(id),
                status: true,
            });

            if (passengers.length > 0) {
                throw new Error(errors.SUB_AGENT_CANNOT_BE_DEACTIVATE);
            }
        }

        return await updateSubAgentRepo({ _id: new ObjectId(id) }, data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};
