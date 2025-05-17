import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import { uploadDocuments } from "../services/fileUpload.service";
import { IRequest, IResponse } from "../interfaces/dto"; // Ensure you import your request/response types

export const fileUploadController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const file = req.file;
        const { type, relatedId } = req.body;

        if (!file || !type || !relatedId) {
            return sendResponse(res, 400, "Missing required fields");
        }

        const response = await uploadDocuments(file, type, relatedId);
        return sendResponse(res, 200, messages.FILE_UPLOAD_SUCCESS, response);
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.FILE_UPLOAD_FAILED,
            null,
            error.message
        );
    }
};
