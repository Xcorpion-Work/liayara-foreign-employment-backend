import { PassengerDocumentType } from "../models/passengerDocumentType.model";

export const createPassengerDocumentTypeRepo = (data: any) => {
    return new PassengerDocumentType(data).save();
};

export const updatePassengerDocumentTypeRepo = (filters: any, data: any) => {
    return PassengerDocumentType.findOneAndUpdate(filters, data, {
        new: true,
    }).exec();
};

export const findAllPassengerDocumentTypeRepo = (filters: any) => {
    return PassengerDocumentType.find(filters).exec();
};

export const findOnePassengerDocumentTypeRepo = (filters: any) => {
    return PassengerDocumentType.findOne(filters).exec();
};

export const aggregatePassengerDocumentTypeRepo = (pipeline: any) => {
    return PassengerDocumentType.aggregate(pipeline).exec();
};
