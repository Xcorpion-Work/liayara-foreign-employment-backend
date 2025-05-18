import { JobOrder } from "../models/jobOrder.model";

export const createJobOrderRepo = (data: any) => {
    return new JobOrder(data).save();
};

export const updateJobOrderRepo = (filters: any, data: any) => {
    return JobOrder.findOneAndUpdate(filters, data, { new: true }).exec();
};

export const findOneJobOrderRepo = (filters: any) => {
    return JobOrder.findOne(filters).exec();
};

export const findAllJobOrderRepo = (filters: any) => {
    return JobOrder.find(filters).exec();
};

export const aggregateJobOrderRepo = (pipeline: any) => {
    return JobOrder.aggregate(pipeline).exec();
};

export const findLastAddedJobOrderRepo = () => {
    return JobOrder.findOne().sort({ createdAt: -1 });
};
