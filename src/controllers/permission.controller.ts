import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createPermissionService,
    getAllPermissionsService,
} from "../services/permission.service";

export const createPermissionController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { body } = req;
        const response = await createPermissionService(body);
        return sendResponse(
            res,
            201,
            messages.PERMISSION_CREATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PERMISSION_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const getAllPermissionsController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const response = await getAllPermissionsService();
        return sendResponse(
            res,
            201,
            messages.PERMISSIONS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PERMISSIONS_FETCH_FAILED,
            null,
            error.message
        );
    }
};
