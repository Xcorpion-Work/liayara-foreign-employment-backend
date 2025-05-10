import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createJobQualificationService,
    findAllJobQualificationService,
    findJobQualificationService,
    updateJobQualificationService,
} from "../services/jobQualification.service";

export const createJobQualificationController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createJobQualificationService(body);
        return sendResponse(
            res,
            201,
            messages.JOB_QUALIFICATION_CREATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_QUALIFICATION_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const updateJobQualificationController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const { id } = req.params;
        const response = await updateJobQualificationService(id, body);
        return sendResponse(
            res,
            200,
            messages.JOB_QUALIFICATION_UPDATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_QUALIFICATION_UPDATE_FAILED,
            null,
            error.message
        );
    }
};

export const getAllJobQualificationController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await findAllJobQualificationService(body);
        return sendResponse(
            res,
            200,
            messages.JOB_QUALIFICATIONS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_QUALIFICATIONS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getJobQualificationController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await findJobQualificationService(id);
        return sendResponse(
            res,
            200,
            messages.JOB_QUALIFICATION_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_QUALIFICATION_FETCH_FAILED,
            null,
            error.message
        );
    }
};
