import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createPassengerService,
    findAllPassengerDesiredJobsService,
    findPassengerDocumentViewService,
    getOnePassengerService,
    getPagedPassengerDocumentMappingService,
    getPagedPassengerService,
    selectJobForPassengerService,
    updatePassengerDocumentService,
    updatePassengerService,
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

export const getAllJobsForPassengerController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await findAllPassengerDesiredJobsService(body);
        return sendResponse(
            res,
            200,
            messages.PASSENGER_JOBS_FETCH_SUCCESS,
            response
        );
    } catch (e: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_JOBS_FETCH_FAILED,
            null,
            e.message
        );
    }
};

export const selectJobForPassengerController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { body, user } = req;
        const response = await selectJobForPassengerService(body, user);
        return sendResponse(
            res,
            200,
            messages.PASSENGER_UPDATE_SUCCESS,
            response
        );
    } catch (e: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_UPDATE_FAILED,
            null,
            e.message
        );
    }
};

export const getPagedPassengerDocumentMappingController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { body } = req;
        const response = await getPagedPassengerDocumentMappingService(body);
        return sendResponse(
            res,
            200,
            messages.PASSENGERS_FETCH_SUCCESS,
            response
        );
    } catch (e: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGERS_FETCH_FAILED,
            null,
            e.message
        );
    }
};

export const getPassengerDocumentsViewController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await findPassengerDocumentViewService(id);
        return sendResponse(
            res,
            200,
            messages.PASSENGER_DOCUMENT_FETCH_SUCCESS,
            response
        );
    } catch (e: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_DOCUMENT_FETCH_FAILED,
            null,
            e.message
        );
    }
};

export const updatePassengerDocumentsViewController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const { body, user } = req;
        const response = await updatePassengerDocumentService(id, body, user);
        return sendResponse(
            res,
            200,
            messages.PASSENGER_DOCUMENT_UPDATE_SUCCESS,
            response
        );
    } catch (e: any) {
        return sendResponse(
            res,
            500,
            messages.PASSENGER_DOCUMENT_UPDATE_FAILED,
            null,
            e.message
        );
    }
};
