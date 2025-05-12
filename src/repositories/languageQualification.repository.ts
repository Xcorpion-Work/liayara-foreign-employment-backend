import { LanguageQualification } from "../models/languageQualification.model";

export const createLanguageQualificationRepo = (data: any) => {
    return new LanguageQualification(data).save();
};

export const updateLanguageQualificationRepo = (filters: any, data: any) => {
    return LanguageQualification.findOneAndUpdate(filters, data, {
        new: true,
    }).exec();
};

export const findAllLanguageQualificationRepo = (filters: any) => {
    return LanguageQualification.find(filters).exec();
};

export const findOneLanguageQualificationRepo = (filters: any) => {
    return LanguageQualification.findOne(filters).exec();
};

export const aggregateLanguageQualificationRepo = (pipeline: any) => {
    return LanguageQualification.aggregate(pipeline).exec();
};
