import { PassengerJobMapping } from "../models/passengerJobMapping.model";
import { PassengerDocumentMapping } from "../models/passengerDocumentMapping.model";

export const createPassengerJobMappingRepo = (data: any) => {
    return new PassengerJobMapping(data).save();
};

export const createPassengerDocumentMappingRepo = (data: any) => {
    return new PassengerDocumentMapping(data).save();
};
