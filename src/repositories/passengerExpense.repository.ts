import { PassengerExpense } from "../models/passengerExpense.model";

export const createPassengerExpenseRepo = (data: any) => {
    return new PassengerExpense(data).save();
};

export const updatePassengerExpenseRepo = (filters: any, data: any) => {
    return PassengerExpense.findOneAndUpdate(filters, data, { new: true });
};

export const findOnePassengerExpenseRepo = (filters: any) => {
    return PassengerExpense.findOne(filters).exec();
};

export const findAllPassengerExpenseRepo = (filters: any) => {
    return PassengerExpense.find(filters).exec();
};

export const aggregatePassengerExpenseRepo = (pipeline: any) => {
    return PassengerExpense.aggregate(pipeline).exec();
};
