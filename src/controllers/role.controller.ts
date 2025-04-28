import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createRoleService,
    getAllRolesService,
    getPagedRolesService,
    getRoleService,
    updateRoleService,
} from "../services/role.service";

export const createRoleController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { body } = req;
        const response = await createRoleService(body);
        return sendResponse(res, 200, messages.ROLE_CREATE_SUCCESS, response);
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.ROLE_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const getPagedRolesController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { body } = req;
        const response = await getPagedRolesService(body);
        return sendResponse(
            res,
            200,
            messages.PAGED_ROLES_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PAGED_ROLES_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const updateRoleController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { body } = req;
        const { id } = req.params;
        const response = await updateRoleService(id, body);
        return sendResponse(res, 200, messages.ROLE_UPDATE_SUCCESS, response);
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.ROLE_UPDATE_FAILED,
            null,
            error.message
        );
    }
};

export const getRoleController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await getRoleService(id);
        return sendResponse(res, 200, messages.ROLE_FETCH_SUCCESS, response);
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.ROLE_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getAllRolesController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { body } = req;
        const response = await getAllRolesService(body);
        return sendResponse(res, 200, messages.ROLES_FETCH_SUCCESS, response);
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.ROLES_FETCH_FAILED,
            null,
            error.message
        );
    }
};
