import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createJobOrderService,
    getAllJobOrderService,
    getOneAggregateJobOrderService,
    getPagedJobOrderService,
    updateJobOrderService,
} from "../services/jobOrder.service";

export const createJobOrderController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createJobOrderService(body);
        return sendResponse(
            res,
            201,
            messages.JOB_ORDER_CREATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_ORDER_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const getPagedJobOrderController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await getPagedJobOrderService(body);
        return sendResponse(
            res,
            200,
            messages.JOB_ORDERS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_ORDERS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getAllJobOrderController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await getAllJobOrderService(body);
        return sendResponse(
            res,
            200,
            messages.JOB_ORDERS_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_ORDERS_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getOneJobOrderController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await getOneAggregateJobOrderService(id);
        return sendResponse(
            res,
            200,
            messages.JOB_ORDER_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_ORDER_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const updateJobOrderController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await updateJobOrderService(id, body);
        return sendResponse(
            res,
            200,
            messages.JOB_ORDER_UPDATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.JOB_ORDER_UPDATE_FAILED,
            null,
            error.message
        );
    }
};
