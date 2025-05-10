import { IRequest, IResponse } from "../interfaces/dto";
import { sendResponse } from "../helpers/sendResponse";
import { messages } from "../constants/messages";
import {
    createCountryService,
    findAllCountriesService,
    findCountryService,
    updateCountryService,
} from "../services/country.service";

export const createCountryController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await createCountryService(body);
        return sendResponse(
            res,
            201,
            messages.COUNTRY_CREATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.COUNTRY_CREATE_FAILED,
            null,
            error.message
        );
    }
};

export const updateCountryController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const { id } = req.params;
        const response = await updateCountryService(id, body);
        return sendResponse(
            res,
            200,
            messages.COUNTRY_UPDATE_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.COUNTRY_UPDATE_FAILED,
            null,
            error.message
        );
    }
};

export const getAllCountriesController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const body = req.body;
        const response = await findAllCountriesService(body);
        return sendResponse(
            res,
            200,
            messages.COUNTRIES_FETCH_SUCCESS,
            response
        );
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.COUNTRIES_FETCH_FAILED,
            null,
            error.message
        );
    }
};

export const getCountryController = async (
    req: IRequest,
    res: IResponse
): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await findCountryService(id);
        return sendResponse(res, 200, messages.COUNTRY_FETCH_SUCCESS, response);
    } catch (error: any) {
        return sendResponse(
            res,
            500,
            messages.COUNTRY_FETCH_FAILED,
            null,
            error.message
        );
    }
};
