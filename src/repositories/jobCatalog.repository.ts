import { JobCatalog } from "../models/jobCatalog.model";

export const createJobCatalogRepo = (data: any) => {
    return new JobCatalog(data).save();
};

export const updateJobCatalogRepo = (filters: any, data: any) => {
    return JobCatalog.findOneAndUpdate(filters, data, {
        new: true,
    }).exec();
};

export const findAllJobCatalogRepo = (filters: any) => {
    return JobCatalog.find(filters).exec();
};

export const findOneJobCatalogRepo = (filters: any) => {
    return JobCatalog.findOne(filters).exec();
};

export const aggregateJobCatalogRepo = (pipeline: any) => {
    return JobCatalog.aggregate(pipeline).exec();
};
