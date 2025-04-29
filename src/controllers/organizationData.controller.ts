import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createOrganizationDataService,
    getOrganizationDataService,
    getRelevantOrganizationData,
    updateOrganizationDataService,
} from "../services/organizationData.service";

export const createOrganizationDataController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createOrganizationDataService(body);
        return sendResponse(
            res,
            201,
            messages.ORGANIZATION_DATA_CREATED_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.ORGANIZATION_DATA_CREATED_FAILED,
            null,
            error.mesaage
        );
    }
};

export const updateOrganizationDataController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const { id } = req.params;
        const response = await updateOrganizationDataService(id, body);
        return sendResponse(
            res,
            200,
            messages.ORGANIZATION_DATA_UPDATED_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.ORGANIZATION_DATA_UPDATED_FAILED,
            null,
            error.mesaage
        );
    }
};

export const getOrganizationDataController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        let response;
        if (id) {
            response = await getOrganizationDataService(id);
        } else {
            response = await getRelevantOrganizationData();
        }
        return sendResponse(
            res,
            200,
            messages.ORGANIZATION_DATA_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.ORGANIZATION_DATA_FETCH_FAILED,
            null,
            error.mesaage
        );
    }
};
