import { PassengerJobMapping } from "../models/passengerJobMapping.model";
import { PassengerDocumentMapping } from "../models/passengerDocumentMapping.model";

export const createPassengerJobMappingRepo = (data: any) => {
    return new PassengerJobMapping(data).save();
};

export const createPassengerDocumentMappingRepo = (data: any) => {
    return new PassengerDocumentMapping(data).save();
};

export const findOnePassengerDocumentMappingRepo = (filters: any) => {
    return PassengerDocumentMapping.findOne(filters).exec();
};

export const updatePassengerDocumentMappingRepo = (filters: any, data: any) => {
    return PassengerDocumentMapping.findOneAndUpdate(filters, data, {
        new: true,
    }).exec();
};

export const aggregatePassengerDocumentMappingRepo = (pipeline: any) => {
    return PassengerDocumentMapping.aggregate(pipeline).exec();
};
