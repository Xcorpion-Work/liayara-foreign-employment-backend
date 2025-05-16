import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createSubAgentService,
    getOneAggregateSubAgentService,
    getPagedSubAgentService,
    updateSubAgentService,
} from "../services/subAgent.service";

export const createSubAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createSubAgentService(body);
        return sendResponse(
            res,
            201,
            messages.SUB_AGENT_CREATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.SUB_AGENT_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const getPagedSubAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await getPagedSubAgentService(body);
        return sendResponse(
            res,
            200,
            messages.SUB_AGENTS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.SUB_AGENTS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getOneSubAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await getOneAggregateSubAgentService(id);
        return sendResponse(
            res,
            200,
            messages.SUB_AGENT_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.SUB_AGENT_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const updateSubAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await updateSubAgentService(id, body);
        return sendResponse(
            res,
            200,
            messages.SUB_AGENT_UPDATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.SUB_AGENT_UPDATE_FAILED,
            null,
            error.message
        );
    }
};
