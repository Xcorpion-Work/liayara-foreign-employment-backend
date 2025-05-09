import {
    createJobCatalogRepo,
    findAllJobCatalogRepo,
    findOneJobCatalogRepo,
    updateJobCatalogRepo,
} from "../repositories/jobCatalog.repository";
import { errors } from "../constants/errors";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const createJobCatalogService = async (data: any) => {
    try {
        const existingJobCatalogs: any = await findAllJobCatalogRepo({
            name: data.name,
        });

        if (existingJobCatalogs.length > 0) {
            throw new Error(errors.JOB_CATALOG_ALREADY_EXIST);
        }

        return await createJobCatalogRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updateJobCatalogService = async (id: any, data: any) => {
    try {
        const existingJobCatalogs: any = await findAllJobCatalogRepo({
            name: data.name,
        });

        const isDuplicate = existingJobCatalogs.some(
            (job: any) => job._id.toString() !== id.toString()
        );

        if (isDuplicate) {
            throw new Error(errors.JOB_CATALOG_ALREADY_EXIST);
        }

        return await updateJobCatalogRepo({ _id: new ObjectId(id) }, data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findAllJobCatalogService = async (data: any) => {
    try {
        const { filters } = data;
        return await findAllJobCatalogRepo(filters);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findJobCatalogService = async (id: any) => {
    try {
        return await findOneJobCatalogRepo({ _id: new ObjectId(id) });
    } catch (e) {
        console.error(e);
        throw e;
    }
};
