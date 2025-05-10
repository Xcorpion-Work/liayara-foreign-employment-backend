import {
    createLanguageQualificationRepo,
    findAllLanguageQualificationRepo,
    findOneLanguageQualificationRepo,
    updateLanguageQualificationRepo,
} from "../repositories/languageQualification.repository";
import { errors } from "../constants/errors";

import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const createLanguageQualificationService = async (data: any) => {
    try {
        const existingQualifications: any =
            await findAllLanguageQualificationRepo({
                name: data.name,
            });

        if (existingQualifications.length > 0) {
            throw new Error(errors.LANGUAGE_QUALIFICATION_ALREADY_EXIST);
        }

        return await createLanguageQualificationRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updateLanguageQualificationService = async (
    id: any,
    data: any
) => {
    try {
        const existingQualifications = await findAllLanguageQualificationRepo({
            name: data.name,
        });

        const isDuplicate = existingQualifications.some(
            (doc) => doc._id.toString() !== id.toString()
        );

        if (isDuplicate) {
            throw new Error(errors.LANGUAGE_QUALIFICATION_ALREADY_EXIST);
        }

        return await updateLanguageQualificationRepo(
            { _id: new ObjectId(id) },
            data
        );
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findAllLanguageQualificationService = async (data: any) => {
    try {
        const { filters } = data;
        return await findAllLanguageQualificationRepo(filters);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findLanguageQualificationService = async (id: any) => {
    try {
        return await findOneLanguageQualificationRepo({
            _id: new ObjectId(id),
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
};
