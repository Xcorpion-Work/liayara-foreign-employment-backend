import { Permission } from "../models/permission.model";

export const createPermissionRepo = (data: any) => {
    return new Permission(data).save();
};

export const findPermissionRepo = (filters: any) => {
    return Permission.findOne(filters).exec();
};

export const findPermissionsRepo = (filters: any) => {
    return Permission.find(filters).exec();
};

export const updatePermissionRepo = (filters: any, data: any) => {
    return Permission.findOneAndUpdate(filters, data, { new: true }).exec();
};

export const aggregatePermissionRepo = (pipeline: any) => {
    return Permission.aggregate(pipeline).exec();
};
