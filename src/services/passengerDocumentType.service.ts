import {
    createPassengerDocumentTypeRepo,
    findAllPassengerDocumentTypeRepo,
    findOnePassengerDocumentTypeRepo,
    updatePassengerDocumentTypeRepo,
} from "../repositories/passengerDocumentType.repository";
import { errors } from "../constants/errors";

import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const createPassengerDocumentTypeService = async (data: any) => {
    try {
        const existingPassengerDocumentTypes: any =
            findAllPassengerDocumentTypeRepo({
                name: data.name,
            });

        if (existingPassengerDocumentTypes.length > 0) {
            throw new Error(errors.PASSENGER_DOCUMENT_TYPE_ALREADY_EXIST);
        }

        return await createPassengerDocumentTypeRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updatePassengerDocumentTypeService = async (
    id: any,
    data: any
) => {
    try {
        const existingPassengerDocumentTypes =
            await findAllPassengerDocumentTypeRepo({ name: data.name });

        const isDuplicate = existingPassengerDocumentTypes.some(
            (doc) => doc._id.toString() !== id.toString()
        );

        if (isDuplicate) {
            throw new Error(errors.PASSENGER_DOCUMENT_TYPE_ALREADY_EXIST);
        }

        return await updatePassengerDocumentTypeRepo(
            { _id: new ObjectId(id) },
            data
        );
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findAllPassengerDocumentTypeService = async (data: any) => {
    try {
        const { filters } = data;
        return await findAllPassengerDocumentTypeRepo(filters);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findPassengerDocumentTypeService = async (id: any) => {
    try {
        return await findOnePassengerDocumentTypeRepo({
            _id: new ObjectId(id),
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
};
