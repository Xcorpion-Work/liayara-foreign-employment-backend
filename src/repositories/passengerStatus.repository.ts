import { PassengerStatus } from "../models/passengerStatus.model";

export const createPassengerStatusRepo = (data: any) => {
    return new PassengerStatus(data).save();
};

export const updatePassengerStatusRepo = (filters: any, data: any) => {
    return PassengerStatus.findOneAndUpdate(filters, data, { new: true });
};

export const aggregatePassengerStatusRepo = (pipeline: any) => {
    return PassengerStatus.aggregate(pipeline).exec();
};

export const findPassengerStatusRepo = (filters: any) => {
    return PassengerStatus.findOne(filters).exec();
};

export const findAllPassengerStatusRepo = (filters: any) => {
    return PassengerStatus.find(filters).exec();
};
