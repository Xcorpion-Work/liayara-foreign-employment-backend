import { SubAgent } from "../models/subAgent.model";

export const createSubAgentRepo = (data: any) => {
    return new SubAgent(data).save();
};

export const updateSubAgentRepo = (filters: any, data: any) => {
    return SubAgent.findOneAndUpdate(filters, data, { new: true }).exec();
};

export const findOneSubAgentRepo = (filters: any) => {
    return SubAgent.findOne(filters).exec();
};

export const findAllSubAgentRepo = (filters: any) => {
    return SubAgent.find(filters).exec();
};

export const aggregateSubAgentRepo = (pipeline: any) => {
    return SubAgent.aggregate(pipeline).exec();
};

export const findLastAddedSubAgentRepo = () => {
    return SubAgent.findOne().sort({ createdAt: -1 });
};
