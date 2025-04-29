import {
    createPermissionRepo,
    findPermissionsRepo,
} from "../repositories/permission.repository";
import { errors } from "../constants/errors";

export const createPermissionService = async (data: any) => {
    try {
        const existPermissions = await findPermissionsRepo({ code: data.code });
        if (existPermissions.length > 0) {
            throw new Error(errors.PERMISSION_ALREADY_EXIST);
        }
        return createPermissionRepo(data);
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
