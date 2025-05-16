import { ForeignAgent } from "../models/foreignAgent.model";

export const createForeignAgentRepo = (data: any) => {
    return new ForeignAgent(data).save();
};

export const updateForeignAgentRepo = (filters: any, data: any) => {
    return ForeignAgent.findOneAndUpdate(filters, data, { new: true }).exec();
};

export const findOneForeignAgentRepo = (filters: any) => {
    return ForeignAgent.findOne(filters).exec();
};

export const findAllForeignAgentRepo = (filters: any) => {
    return ForeignAgent.find(filters).exec();
};

export const aggregateForeignAgentRepo = (pipeline: any) => {
    return ForeignAgent.aggregate(pipeline).exec();
};

export const findLastAddedForeignAgentRepo = () => {
    return ForeignAgent.findOne().sort({ createdAt: -1 });
};
