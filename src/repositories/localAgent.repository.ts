import { LocalAgent } from "../models/localAgent.model";

export const createLocalAgentRepo = (data: any) => {
    return new LocalAgent(data).save();
};

export const updateLocalAgentRepo = (filters: any, data: any) => {
    return LocalAgent.findOneAndUpdate(filters, data, { new: true }).exec();
};

export const findOneLocalAgentRepo = (filters: any) => {
    return LocalAgent.findOne(filters).exec();
};

export const findAllLocalAgentRepo = (filters: any) => {
    return LocalAgent.find(filters).exec();
};

export const aggregateLocalAgentRepo = (pipeline: any) => {
    return LocalAgent.aggregate(pipeline).exec();
};

export const findLastAddedLocalAgentRepo = () => {
    return LocalAgent.findOne().sort({ createdAt: -1 });
};
