import {
    createPermissionRepo,
    findPermissionsRepo,
} from "../repositories/permission.repository";
import { errors } from "../constants/errors";
import { findRolesRepo, updateRoleRepo } from "../repositories/role.repository";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const createPermissionService = async (data: any) => {
    try {
        const existPermissions = await findPermissionsRepo({ code: data.code });
        if (existPermissions.length > 0) {
            throw new Error(errors.PERMISSION_ALREADY_EXIST);
        }
        const superAdmins: any = await findRolesRepo({ name: "Super Admin" });
        const permission: any = await createPermissionRepo(data);
        for (const superAdmin of superAdmins) {
            superAdmin.permissions = [
                ...superAdmin.permissions,
                permission._id,
            ];
            await updateRoleRepo(
                { _id: new ObjectId(superAdmin._id) },
                superAdmin
            );
        }
        return permission;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getAllPermissionsService = async () => {
    try {
        return await findPermissionsRepo({});
    } catch (e) {
        console.error(e);
        throw e;
    }
};
