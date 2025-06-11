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
import {
    findAllPassengerStatusRepo,
    findPassengerStatusRepo,
} from "../repositories/passengerStatus.repository";
import { aggregateJobOrderRepo } from "../repositories/jobOrder.repository";
import { findAllPassengerDocumentTypeRepo } from "../repositories/passengerDocumentType.repository";
import {
    createPassengerDocumentMappingRepo,
    createPassengerJobMappingRepo,
} from "../repositories/PassengerMappings.repository";
import { updateJobVacancyService } from "./jobOrder.service";

const ObjectId = mongoose.Types.ObjectId;

export const createPassengerService = async (inputData: any) => {
    try {
        const { nic, phone, email } = inputData;

        // Uniqueness checks
        const existingMatches = await Promise.all([
            findAllPassengerRepo({ nic }),
            findAllPassengerRepo({ phone }),
            email?.trim()
                ? findAllPassengerRepo({ email })
                : Promise.resolve([]),
        ]);

        const [nicMatches, phoneMatches, emailMatches] = existingMatches;

        if (nicMatches.length || phoneMatches.length || emailMatches.length) {
            throw new Error(errors.PASSENGER_ALREADY_EXIST);
        }

        // Get the first passenger status by sequence
        const passengerStatuses: any[] = await findAllPassengerStatusRepo({
            status: true,
        });
        const firstStatus = passengerStatuses.sort(
            (a, b) => a.sequence - b.sequence
        )[0];

        // Prepare passenger object
        const passengerData = {
            ...inputData,
            passengerId: await generatePassengerId(),
            subAgent: inputData.subAgent
                ? new ObjectId(inputData.subAgent)
                : null,
            localAgent: inputData.localAgent
                ? new ObjectId(inputData.localAgent)
                : null,
            desiredJobs: inputData.desiredJobs.map((j: any) => new ObjectId(j)),
            desiredCountries: inputData.desiredCountries.map(
                (c: any) => new ObjectId(c)
            ),
            covidVaccinated: inputData.covidVaccinated === "Yes",
            abroadExperience: inputData.abroadExperience === "Yes",
            passengerStatus: firstStatus?.code || null,
        };

        // Check if profile details are complete
        const { height, weight, desiredJobs, desiredCountries } = passengerData;
        passengerData.isCompletedDetails =
            height !== 0 &&
            weight !== 0 &&
            desiredJobs.length > 0 &&
            desiredCountries.length > 0;

        return await createPassengerRepo(passengerData);
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

        const lastId = lastAddedPassenger.passengerId;
        const match = lastId?.match(/^LP-(\d{4})$/);

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

export const findAllPassengerDesiredJobsService = async (data: any) => {
    try {
        const { passenger } = data;
        const existingPassenger = await findOnePassengerRepo({
            _id: new ObjectId(passenger),
        });

        if (!existingPassenger) {
            throw new Error(errors.INVALID_PASSENGER);
        }

        const { desiredJobs, desiredCountries } = existingPassenger;

        const pipeline = [
            {
                $unwind: "$jobs",
            },
            {
                $project: {
                    _id: 1,
                    jobOrderId: 1,
                    jobOrderApprovalNumber: 1,
                    foreignAgentId: "$foreignAgent",
                    jobOrderStatus: 1,
                    status: 1,
                    jobId: "$jobs._id",
                    jobCatalogId: "$jobs.jobCatalogId",
                    vacancies: "$jobs.vacancies",
                    approvedVacancies: "$jobs.approvedVacancies",
                    salary: "$jobs.salary",
                    leftVacancies: "$jobs.leftVacancies",
                },
            },
            {
                $lookup: {
                    from: "foreign_agents",
                    localField: "foreignAgentId",
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
                    as: "jobCatalogData",
                    from: "job_catalogs",
                    foreignField: "_id",
                    localField: "jobCatalogId",
                },
            },
            {
                $unwind: {
                    path: "$jobCatalogData",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    countryId: "$foreignAgentData.country",
                },
            },
            {
                $lookup: {
                    as: "countryData",
                    from: "countries",
                    foreignField: "_id",
                    localField: "countryId",
                },
            },
            {
                $unwind: {
                    path: "$countryData",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $match: {
                    countryId: { $in: desiredCountries },
                    jobCatalogId: { $in: desiredJobs },
                    jobOrderStatus: "ACTIVE",
                    "jobCatalogData.gender": existingPassenger.gender,
                },
            },
        ];

        return await aggregateJobOrderRepo(pipeline);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const selectJobForPassengerService = async (data: any, user: any) => {
    try {
        const {
            commission,
            fee,
            jobOrderId,
            jobCatalogId,
            salary,
            jobId,
            // selectJob,
            passengerId,
        } = data;
        const passenger: any = await findOnePassengerRepo({
            _id: new ObjectId(passengerId),
        });

        const passengerStatus: any = await findPassengerStatusRepo({
            code: passenger.passengerStatus,
        });
        const isAuthorizedUser = await authorizedUserForPassengerStatusApprove(
            user,
            passengerStatus
        );
        if (!isAuthorizedUser) {
            throw new Error(errors.UNAUTHORIZED_USER);
        }
        const nextApprovalLevel: any = await findPassengerStatusRepo({
            isFinale: false,
            sequence: passengerStatus.sequence + 1,
        });
        const passengerPayload = {
            selectedJobOrderId: new ObjectId(jobOrderId),
            selectedJobCatalogId: new ObjectId(jobCatalogId),
            agreedCommission: commission,
            agreedFee: fee,
            salary: salary,
            passengerStatus: nextApprovalLevel.code,
        };
        const passengerJobMappingPayload = {
            passengerId: new ObjectId(passengerId),
            jobOrderId: new ObjectId(jobOrderId),
            jobCatalogId: new ObjectId(jobCatalogId),
            agreedCommission: commission,
            agreedFee: fee,
            salary: salary,
        };
        const documentTypes = await findAllPassengerDocumentTypeRepo({});

        const passengerDocumentMappingPayload = {
            passenger: new ObjectId(passengerId),
            documents: documentTypes.map((doc) => ({
                documentType: doc._id,
                name: null,
                path: null,
            })),
        };

        await createPassengerJobMappingRepo(passengerJobMappingPayload);
        await createPassengerDocumentMappingRepo(
            passengerDocumentMappingPayload
        );
        await updateJobVacancyService(
            new ObjectId(jobOrderId),
            new ObjectId(jobId),
            "select"
        );

        return await updatePassengerRepo(
            { _id: new ObjectId(passengerId) },
            passengerPayload
        );
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const authorizedUserForPassengerStatusApprove = async (
    user: any,
    passengerStatus: any
) => {
    const role = user.role._id;
    if (passengerStatus.roles.includes(role)) {
        return true;
    }
    return false;
};
