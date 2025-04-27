import { Role } from "../models/role.model";

export const createRoleRepo = (data: any) => {
    return new Role(data).save();
};

export const findRoleRepo = (filters: any) => {
    return Role.findOne(filters).exec();
};

export const findRolesRepo = (filters: any) => {
    return Role.find(filters).exec();
};

export const aggregateRoleRepo = (pipeline: any) => {
    return Role.aggregate(pipeline).exec();
};

export const updateRoleRepo = (filters: any, data: any) => {
    return Role.findOneAndUpdate(filters, data, { new: true }).exec();
};
