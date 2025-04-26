import { IRequest, IResponse } from "../interfaces/dto";
import {
    changePasswordService,
    changeUserStatusService,
    confirmLoginService,
    createUserService,
    findAllUsersService,
    forgotPasswordService,
    loginByForgotPasswordService,
    tokenRefreshService,
    userLoginService,
} from "../services/user.service";
import { sendResponse } from "../helpers/sendResponse";
import { createNotificationsForNewUserAdding } from "../services/email.service";
import { messages } from "../constants/messages";

export const signupController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createUserService(body);
        await createNotificationsForNewUserAdding(response);
        return sendResponse(res, 201, messages.USER_SIGNUP_SUCCESS, response);
    } catch (error: any) {
        console.error(error.message);
        return sendResponse(
            res,
            500,
            messages.USER_SIGNUP_FAILED,
            null,
            error.message
        );
    }
};

export const loginController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await userLoginService(body);
        return sendResponse(res, 200, messages.USER_LOGIN_SUCCESS, response);
    } catch (error: any) {
        console.error(error.message);
        return sendResponse(
            res,
            500,
            messages.USER_LOGIN_FAILED,
            null,
            error.message
        );
    }
};

export const loginByForgotPasswordController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await loginByForgotPasswordService(body);
        return sendResponse(res, 200, messages.USER_LOGIN_SUCCESS, response);
    } catch (error: any) {
        console.error(error.message);
        return sendResponse(
            res,
            500,
            messages.USER_LOGIN_FAILED,
            null,
            error.message
        );
    }
};

export const forgotPasswordController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { email } = req.body;
        const response = await forgotPasswordService(email);
        return sendResponse(
            res,
            200,
            messages.FORGOT_PASSWORD_SUBMIT_SUCCESS,
            response
        );
    } catch (error: any) {
        console.error(error.message);
        return sendResponse(
            res,
            500,
            messages.FORGOT_PASSWORD_SUBMIT_FAILED,
            null,
            error.message
        );
    }
};

export const confirmLoginController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { user } = req;
        const response = await confirmLoginService(user);
        return sendResponse(res, 200, messages.LOGIN_CONFIRM_SUCCESS, response);
    } catch (error: any) {
        console.error(error.message);
        return sendResponse(
            res,
            401,
            messages.LOGIN_CONFIRM_FAILED,
            null,
            error.message
        );
    }
};

export const tokenRefreshController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const payload = await tokenRefreshService(body);
        return sendResponse(
            res,
            200,
            messages.TOKEN_REFRESHED_SUCCESS,
            payload
        );
    } catch (error: any) {
        console.error(error);
        return sendResponse(
            res,
            500,
            messages.TOKEN_REFRESHED_FAILED,
            null,
            error.message
        );
    }
};

export const changePasswordController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { body, user } = req;
        const payload = await changePasswordService(body, user);
        return sendResponse(
            res,
            200,
            messages.CHANGE_PASSWORD_SUCCESS,
            payload
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.CHANGE_PASSWORD_FAILED,
            null,
            error.message
        );
    }
};

export const getAllUsersController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const payload = await findAllUsersService({});
        return sendResponse(res, 200, messages.USERS_FETCH_SUCCESS, payload);
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.USERS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const userStatusChangeController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await changeUserStatusService(id, body);
        return sendResponse(
            res,
            200,
            messages.USER_STATUS_CHANGE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.USER_STATUS_CHANGE_FAILED,
            null,
            error.message
        );
    }
};
