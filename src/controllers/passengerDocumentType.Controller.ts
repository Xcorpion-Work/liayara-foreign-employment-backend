import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createPassengerDocumentTypeService,
    findAllPassengerDocumentTypeService,
    findPassengerDocumentTypeService,
    updatePassengerDocumentTypeService,
} from "../services/passengerDocumentType.service";

export const createPassengerDocumentTypeController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createPassengerDocumentTypeService(body);
        return sendResponse(
            res,
            201,
            messages.PASSENGER_DOCUMENT_TYPE_CREATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_DOCUMENT_TYPE_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const updatePassengerDocumentTypeController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const { id } = req.params;
        const response = await updatePassengerDocumentTypeService(id, body);
        return sendResponse(
            res,
            200,
            messages.PASSENGER_DOCUMENT_TYPE_UPDATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_DOCUMENT_TYPE_UPDATE_FAILED,
            null,
            error.message
        );
    }
};

export const getAllPassengerDocumentTypeController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await findAllPassengerDocumentTypeService(body);
        return sendResponse(
            res,
            200,
            messages.PASSENGER_DOCUMENT_TYPES_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_DOCUMENT_TYPES_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getPassengerDocumentTypeController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await findPassengerDocumentTypeService(id);
        return sendResponse(
            res,
            200,
            messages.PASSENGER_DOCUMENT_TYPE_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_DOCUMENT_TYPE_FETCH_FAILED,
            null,
            error.message
        );
    }
};
