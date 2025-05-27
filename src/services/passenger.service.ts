import {
    aggregatePassengerRepo,
    createPassengerRepo,
    findLastAddedPassengerRepo,
    findOnePassengerRepo,
} from "../repositories/passenger.repository";
import { errors } from "../constants/errors";
import { findAllPassengerStatusRepo } from "../repositories/passengerStatus.repository";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const createPassengerService = async (data: any) => {
    try {
        const { nic } = data;
        const existingPassenger = await findOnePassengerRepo({ nic: nic });
        console.log(existingPassenger);
        const passengerStatus: any[] = await findAllPassengerStatusRepo({
            status: true,
        });
        const sortedStatus = passengerStatus.sort(
            (a, b) => a.sequence - b.sequence
        );
        const firstStatus = sortedStatus[0];

        if (existingPassenger) {
            throw new Error(errors.PASSENGER_ALREADY_EXIST);
        }

        data.passengerId = await generatePassengerId();
        data.subAgent = data.subAgent ? new ObjectId(data.subAgent) : null;
        data.localAgent = data.localAgent
            ? new ObjectId(data.localAgent)
            : null;
        data.covidVaccinated = data.covidVaccinated === "Yes";
        data.abroadExperience = data.abroadExperience === "Yes";
        data.passengerStatus = firstStatus.name;
        console.log("data", data);
        return await createPassengerRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const generatePassengerId = async () => {
    try {
        const lastAddedPassenger: any = await findLastAddedPassengerRepo();

        if (!lastAddedPassenger || !lastAddedPassenger.passengerId) {
            return "LP-0001";
        }

        const lastId = lastAddedPassenger.localAgentId;
        const match = lastId.match(/^LP-(\d{4})$/);

        if (!match) {
            return "LP-0001";
        }

        const numericPart = parseInt(match[1], 10);
        const nextNumber = numericPart + 1;
        return `LP-${nextNumber.toString().padStart(4, "0")}`;
    } catch (e) {
        console.error("Error generating LocalAgent ID:", e);
        throw e;
    }
};

export const getPagedPassengerService = async (data: any) => {
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
                { passengerId: { $regex: searchQuery, $options: "i" } },
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

        const passengers = await aggregatePassengerRepo(pipeline);
        return passengers[0] || { total: 0, pageIndex: page, result: [] };
    } catch (e) {
        console.error(e);
        throw e;
    }
};
