import {
    aggregateRoleRepo,
    createRoleRepo,
    findRoleRepo,
    findRolesRepo,
    updateRoleRepo,
} from "../repositories/role.repository";
import mongoose from "mongoose";

import ObjectId = mongoose.Types.ObjectId;
import { errors } from "../constants/errors";
import { findUsersRepo } from "../repositories/user.repository";

export const getPagedRolesService = async (data: any) => {
    try {
        const { pageSize, page } = data.filters;
        const skip = (page - 1) * pageSize;

        const pipeline = [
            {
                $sort: { createdAt: -1 },
            },
            {
                $lookup: {
                    as: "users",
                    from: "users",
                    foreignField: "role",
                    localField: "_id",
                },
            },
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [{ $skip: skip }, { $limit: pageSize }],
                },
            },
            {
                $unwind: {
                    path: "$metadata",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    "metadata.pageIndex": page,
                },
            },
            {
                $project: {
                    total: "$metadata.total",
                    pageIndex: "$metadata.pageIndex",
                    result: "$data",
                },
            },
            {
                $project: {
                    "result.users.recoveryCode": 0,
                    "result.users.password": 0,
                },
            },
        ];
        const roles = await aggregateRoleRepo(pipeline);

        return roles[0] || { total: 0, pageIndex: page, result: [] };
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updateRoleService = async (id: any, data: any) => {
    try {
        const role = await findRoleRepo({ _id: new ObjectId(id) });
        if (!role) {
            throw new Error(errors.INVALID_ROLE);
        }
        if (role.name === "Super Admin") {
            throw new Error(errors.SUPER_ADMIN_CANNOT_BE_EDIT);
        }
        const roleBaseUsers = await findUsersRepo({
            role: new ObjectId(id),
            status: true,
        });
        if (roleBaseUsers.length > 0 && data.status && !data.status) {
            throw new Error(
                errors.ROLE_CANNOT_BE_DEACTIVATE_BECAUSE_OF_ACTIVE_USERS
            );
        }
        delete data.id;
        const updatedRole: any = await updateRoleRepo(
            { _id: new ObjectId(id) },
            data
        );
        return await getOneAggregateRoleService(updatedRole._id);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const createRoleService = async (data: any) => {
    try {
        const role = await findRoleRepo({ name: data.name });
        if (role) {
            throw new Error(errors.ROLE_IS_ALREADY_EXIST);
        }
        data.permissions = data.permissions.map((p: any) => new ObjectId(p));
        return await createRoleRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getOneAggregateRoleService = async (id: any) => {
    try {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
            {
                $lookup: {
                    as: "permissionsData",
                    from: "permissions",
                    foreignField: "_id",
                    localField: "permissions",
                },
            },
            {
                $lookup: {
                    as: "users",
                    from: "users",
                    foreignField: "role",
                    localField: "_id",
                },
            },
            {
                $project: {
                    "users.password": 0,
                    "users.recoveryCode": 0,
                },
            },
        ];
        const result = await aggregateRoleRepo(pipeline);
        return result[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getAllRolesService = async (data: any) => {
    try {
        const { filters } = data;
        return await findRolesRepo(filters);
    } catch (e) {
        console.error(e);
        throw e;
    }
};
