import { JobQualification } from "../models/jobQualification.model";

export const createJobQualificationRepo = (data: any) => {
    return new JobQualification(data).save();
};

export const updateJobQualificationRepo = (filters: any, data: any) => {
    return JobQualification.findOneAndUpdate(filters, data, {
        new: true,
    }).exec();
};

export const findAllJobQualificationRepo = (filters: any) => {
    return JobQualification.find(filters).exec();
};

export const findOneJobQualificationRepo = (filters: any) => {
    return JobQualification.findOne(filters).exec();
};

export const aggregateJobQualificationRepo = (pipeline: any) => {
    return JobQualification.aggregate(pipeline).exec();
};
