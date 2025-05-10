import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createLanguageQualificationService,
    findAllLanguageQualificationService,
    findLanguageQualificationService,
    updateLanguageQualificationService,
} from "../services/languageQualification.service";

export const createLanguageQualificationController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createLanguageQualificationService(body);
        return sendResponse(
            res,
            201,
            messages.LANGUAGE_QUALIFICATION_CREATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.LANGUAGE_QUALIFICATION_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const updateLanguageQualificationController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const { id } = req.params;
        const response = await updateLanguageQualificationService(id, body);
        return sendResponse(
            res,
            200,
            messages.LANGUAGE_QUALIFICATION_UPDATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.LANGUAGE_QUALIFICATION_UPDATE_FAILED,
            null,
            error.message
        );
    }
};

export const getAllLanguageQualificationController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await findAllLanguageQualificationService(body);
        return sendResponse(
            res,
            200,
            messages.LANGUAGE_QUALIFICATIONS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.LANGUAGE_QUALIFICATIONS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getLanguageQualificationController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await findLanguageQualificationService(id);
        return sendResponse(
            res,
            200,
            messages.LANGUAGE_QUALIFICATION_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.LANGUAGE_QUALIFICATION_FETCH_FAILED,
            null,
            error.message
        );
    }
};
