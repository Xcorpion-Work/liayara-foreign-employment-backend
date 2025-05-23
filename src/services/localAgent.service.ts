import {
    aggregateLocalAgentRepo,
    createLocalAgentRepo,
    findLastAddedLocalAgentRepo,
    findOneLocalAgentRepo,
    updateLocalAgentRepo,
} from "../repositories/localAgent.repository";
import { errors } from "../constants/errors";
import mongoose from "mongoose";
import { findAllPassengerRepo } from "../repositories/passenger.repository";

const ObjectId = mongoose.Types.ObjectId;

export const createLocalAgentService = async (data: any) => {
    try {
        const existingLocalAgent = await findOneLocalAgentRepo({
            phone: data?.phone,
        });

        if (existingLocalAgent) {
            throw new Error(errors.LOCAL_AGENT_ALREADY_EXIST);
        }

        data.localAgentId = await generateLocalAgentId();
        return await createLocalAgentRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const generateLocalAgentId = async () => {
    try {
        const lastAddedLocalAgent = await findLastAddedLocalAgentRepo();

        if (!lastAddedLocalAgent || !lastAddedLocalAgent.localAgentId) {
            return "LLA-0001";
        }

        const lastId = lastAddedLocalAgent.localAgentId;
        const match = lastId.match(/^LLA-(\d{4})$/);

        if (!match) {
            return "LLA-0001";
        }

        const numericPart = parseInt(match[1], 10);
        const nextNumber = numericPart + 1;
        return `LLA-${nextNumber.toString().padStart(4, "0")}`;
    } catch (e) {
        console.error("Error generating LocalAgent ID:", e);
        throw e;
    }
};

export const getPagedLocalAgentService = async (data: any) => {
    try {
        const {
            pageSize,
            page,
            searchQuery,
            status,
            sortField = "createdAt",
            sortOrder = "desc",
        } = data.filters;
        const skip = (page - 1) * pageSize;
        const matchStage: any = {};

        if (searchQuery) {
            matchStage.$or = [
                { name: { $regex: searchQuery, $options: "i" } },
                { localAgentId: { $regex: searchQuery, $options: "i" } },
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

        pipeline.push({
            $sort: {
                [sortField]: sortOrder === "asc" ? 1 : -1,
            },
        });

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
            { $addFields: { "metadata.pageIndex": page } },
            {
                $project: {
                    total: "$metadata.total",
                    pageIndex: "$metadata.pageIndex",
                    result: "$data",
                },
            }
        );

        const localAgents = await aggregateLocalAgentRepo(pipeline);
        return localAgents[0] || { total: 0, pageIndex: page, result: [] };
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getOneAggregateLocalAgentService = async (id: any) => {
    try {
        const pipeline = [{ $match: { _id: new ObjectId(id) } }];

        const result = await aggregateLocalAgentRepo(pipeline);
        return result[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updateLocalAgentService = async (id: any, data: any) => {
    try {
        const localAgent = await findOneLocalAgentRepo({
            _id: new ObjectId(id),
        });

        if (!localAgent) {
            throw new Error(errors.INVALID_LOCAL_AGENT);
        }

        const existingLocalAgent = await findOneLocalAgentRepo({
            phone: data.phone,
        });

        if (existingLocalAgent && existingLocalAgent._id.toString() !== id) {
            throw new Error(errors.LOCAL_AGENT_ALREADY_EXIST);
        }

        if (data?.status === false) {
            const passengers = await findAllPassengerRepo({
                subAgent: new ObjectId(id), // Consider renaming "subAgent" to "localAgent" in passenger schema too
                status: true,
            });

            if (passengers.length > 0) {
                throw new Error(errors.LOCAL_AGENT_CANNOT_BE_DEACTIVATED);
            }
        }

        return await updateLocalAgentRepo({ _id: new ObjectId(id) }, data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};
