import { Passenger } from "../models/passenger.model";

export const createPassengerRepo = (data: any) => {
    return new Passenger(data).save();
};

export const updatePassengerRepo = (filters: any, data: any) => {
    return Passenger.findOneAndUpdate(filters, data, { new: true });
};

export const findOnePassengerRepo = (filters: any) => {
    return Passenger.find(filters).exec();
};

export const findAllPassengerRepo = (filters: any) => {
    return Passenger.find(filters).exec();
};

export const aggregatePassengerRepo = (pipeline: any) => {
    return Passenger.aggregate(pipeline).exec();
};
