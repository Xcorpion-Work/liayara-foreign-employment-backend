import {
    aggregatePassengerRepo,
    createPassengerRepo,
    findAllPassengerRepo,
    findLastAddedPassengerRepo,
    findOnePassengerRepo,
    updatePassengerRepo,
} from "../repositories/passenger.repository";
import { errors } from "../constants/errors";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const createPassengerService = async (data: any) => {
    try {
        const { nic, phone, email } = data;
        const existingPassengersByNic = await findAllPassengerRepo({
            nic: nic,
        });
        const existingPassengersByPhone = await findAllPassengerRepo({
            phone: phone,
        });
        const existingPassengersByEmail = await findAllPassengerRepo({
            email: email,
        });

        if (
            (existingPassengersByNic.length > 0,
            existingPassengersByPhone.length > 0,
            existingPassengersByEmail.length > 0)
        ) {
            throw new Error(errors.PASSENGER_ALREADY_EXIST);
        }

        data.passengerId = await generatePassengerId();

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
            passengerStatus,
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
            ];
        }

        if (status) {
            matchStage.status = status === "ACTIVE";
        }

        if (passengerStatus) {
            matchStage.passengerStatus = passengerStatus;
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

export const getOnePassengerService = async (id: any) => {
    try {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "sub_agents",
                    localField: "subAgent",
                    foreignField: "_id",
                    as: "subAgentData",
                },
            },
            {
                $unwind: {
                    path: "$subAgentData",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: "local_agents",
                    localField: "localAgent",
                    foreignField: "_id",
                    as: "localAgentData",
                },
            },
            {
                $unwind: {
                    path: "$localAgentData",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: "job_catalogs",
                    localField: "desiredJobs",
                    foreignField: "_id",
                    as: "desiredJobsData",
                },
            },
            {
                $lookup: {
                    from: "countries",
                    localField: "desiredCountries",
                    foreignField: "_id",
                    as: "desiredCountriesData",
                },
            },
            {
                $lookup: {
                    as: "passengerStatusData",
                    from: "passenger_statuses",
                    foreignField: "code",
                    localField: "passengerStatus",
                },
            },
            {
                $unwind: {
                    path: "$passengerStatusData",
                    preserveNullAndEmptyArrays: true,
                },
            },
        ];

        const result = await aggregatePassengerRepo(pipeline);
        return result[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updatePassengerService = async (id: any, data: any) => {
    try {
        const passenger = await findOnePassengerRepo({ _id: new ObjectId(id) });
        if (!passenger) {
            throw new Error(errors.INVALID_PASSENGER);
        }

        if (data.status === false || data.status === true) {
            return await updatePassengerRepo({ _id: new ObjectId(id) }, data);
        }

        const existing: any = await findOnePassengerRepo({ nic: data.nic });
        if (existing && existing._id.toString() !== id) {
            throw new Error(errors.PASSENGER_ALREADY_EXIST);
        }

        data.covidVaccinated = data.covidVaccinated === "Yes";
        data.abroadExperience = data.abroadExperience === "Yes";
        data.subAgent = data.subAgent ? new ObjectId(data.subAgent) : null;
        data.localAgent = data.localAgent
            ? new ObjectId(data.localAgent)
            : null;
        data.desiredJobs = data.desiredJobs.map((j: any) => new ObjectId(j));
        data.desiredCountries = data.desiredCountries.map(
            (c: any) => new ObjectId(c)
        );
        const { height, weight, desiredJobs, desiredCountries } = data;
        if (
            height !== 0 ||
            weight !== 0 ||
            desiredJobs.length !== 0 ||
            desiredCountries.length !== 0
        ) {
            data.isCompletedDetails = true;
        }

        return await updatePassengerRepo({ _id: new ObjectId(id) }, data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};
