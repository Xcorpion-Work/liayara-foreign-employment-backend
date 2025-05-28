import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createPassengerService, getOnePassengerService,
    getPagedPassengerService, updatePassengerService,
} from "../services/passenger.service";

export const createPassengerController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createPassengerService(body);
        return sendResponse(
            res,
            201,
            messages.PASSENGER_CREATE_SUCCESS,
            response
        );
    } catch (e: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_CREATE_FAILED,
            null,
            e.message
        );
    }
};

export const getPagedPassengerController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await getPagedPassengerService(body);
        return sendResponse(
            res,
            200,
            messages.PASSENGERS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGERS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getOnePassengerController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await getOnePassengerService(id);
        return sendResponse(
            res,
            200,
            messages.PASSENGERS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGERS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const updatePassengerController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await updatePassengerService(id, body);
        return sendResponse(
            res,
            200,
            messages.PASSENGER_UPDATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_UPDATE_FAILED,
            null,
            error.message
        );
    }
};
