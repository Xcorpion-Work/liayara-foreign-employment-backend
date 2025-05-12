import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createPassengerStatusService,
    findAllPassengerStatusService,
    findPassengerStatusService,
    updatePassengerStatusService,
} from "../services/passengerStatus.service";

export const createPassengerStatusController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createPassengerStatusService(body);
        return sendResponse(
            res,
            201,
            messages.PASSENGER_STATUS_CREATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_STATUS_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const getAllPassengerStatusController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await findAllPassengerStatusService(body);
        return sendResponse(
            res,
            200,
            messages.PASSENGER_STATUS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_STATUS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getPassengerStatusController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await findPassengerStatusService(id);
        return sendResponse(
            res,
            200,
            messages.PASSENGER_STATUS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_STATUS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const updatePassengerStatusController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const { id } = req.params;
        const response = await updatePassengerStatusService(id, body);
        return sendResponse(
            res,
            200,
            messages.PASSENGER_STATUS_UPDATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_STATUS_UPDATE_FAILED,
            null,
            error.message
        );
    }
};
