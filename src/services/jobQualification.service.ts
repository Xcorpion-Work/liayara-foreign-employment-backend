import {
    createJobQualificationRepo,
    findAllJobQualificationRepo,
    findOneJobQualificationRepo,
    updateJobQualificationRepo,
} from "../repositories/jobQualification.repository";
import { errors } from "../constants/errors";

import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const createJobQualificationService = async (data: any) => {
    try {
        const existingJobQualifications: any =
            await findAllJobQualificationRepo({
                name: data.name,
            });

        if (existingJobQualifications.length > 0) {
            throw new Error(errors.JOB_QUALIFICATION_ALREADY_EXIST);
        }

        return await createJobQualificationRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updateJobQualificationService = async (id: any, data: any) => {
    try {
        const existingJobQualifications = await findAllJobQualificationRepo({
            name: data.name,
        });

        const isDuplicate = existingJobQualifications.some(
            (doc) => doc._id.toString() !== id.toString()
        );

        if (isDuplicate) {
            throw new Error(errors.JOB_QUALIFICATION_ALREADY_EXIST);
        }

        return await updateJobQualificationRepo(
            { _id: new ObjectId(id) },
            data
        );
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findAllJobQualificationService = async (data: any) => {
    try {
        const { filters } = data;
        return await findAllJobQualificationRepo(filters);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findJobQualificationService = async (id: any) => {
    try {
        return await findOneJobQualificationRepo({
            _id: new ObjectId(id),
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
};
