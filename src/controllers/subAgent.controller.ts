import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import { createSubAgentService } from "../services/subAgent.service";

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
