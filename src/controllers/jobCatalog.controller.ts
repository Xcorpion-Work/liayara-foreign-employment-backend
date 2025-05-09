import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createJobCatalogService,
    findAllJobCatalogService,
    findJobCatalogService,
    updateJobCatalogService,
} from "../services/jobCatalog.service";

export const createJobCatalogController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createJobCatalogService(body);
        return sendResponse(
            res,
            201,
            messages.JOB_CATALOG_CREATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_CATALOG_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const updateJobCatalogController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const { id } = req.params;
        const response = await updateJobCatalogService(id, body);
        return sendResponse(
            res,
            200,
            messages.JOB_CATALOG_UPDATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_CATALOG_UPDATE_FAILED,
            null,
            error.message
        );
    }
};

export const getAllJobCatalogController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await findAllJobCatalogService(body);
        return sendResponse(
            res,
            200,
            messages.JOB_CATALOGS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_CATALOGS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getJobCatalogController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await findJobCatalogService(id);
        return sendResponse(
            res,
            200,
            messages.JOB_CATALOG_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_CATALOG_FETCH_FAILED,
            null,
            error.message
        );
    }
};
