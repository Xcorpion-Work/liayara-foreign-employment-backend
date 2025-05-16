import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createForeignAgentService,
    getOneAggregateForeignAgentService,
    getPagedForeignAgentService,
    updateForeignAgentService,
} from "../services/foreignAgent.service";

export const createForeignAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createForeignAgentService(body);
        return sendResponse(
            res,
            201,
            messages.FOREIGN_AGENT_CREATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.FOREIGN_AGENT_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const getPagedForeignAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await getPagedForeignAgentService(body);
        return sendResponse(
            res,
            200,
            messages.FOREIGN_AGENTS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.FOREIGN_AGENTS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getOneForeignAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await getOneAggregateForeignAgentService(id);
        return sendResponse(
            res,
            200,
            messages.FOREIGN_AGENT_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.FOREIGN_AGENT_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const updateForeignAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await updateForeignAgentService(id, body);
        return sendResponse(
            res,
            200,
            messages.FOREIGN_AGENT_UPDATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.FOREIGN_AGENT_UPDATE_FAILED,
            null,
            error.message
        );
    }
};
