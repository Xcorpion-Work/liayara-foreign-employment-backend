import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createLocalAgentService,
    getOneAggregateLocalAgentService,
    getPagedLocalAgentService,
    updateLocalAgentService,
} from "../services/localAgent.service";

export const createLocalAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createLocalAgentService(body);
        return sendResponse(
            res,
            201,
            messages.LOCAL_AGENT_CREATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.LOCAL_AGENT_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const getPagedLocalAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await getPagedLocalAgentService(body);
        return sendResponse(
            res,
            200,
            messages.LOCAL_AGENTS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.LOCAL_AGENTS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getOneLocalAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await getOneAggregateLocalAgentService(id);
        return sendResponse(
            res,
            200,
            messages.LOCAL_AGENT_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.LOCAL_AGENT_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const updateLocalAgentController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await updateLocalAgentService(id, body);
        return sendResponse(
            res,
            200,
            messages.LOCAL_AGENT_UPDATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.LOCAL_AGENT_UPDATE_FAILED,
            null,
            error.message
        );
    }
};
