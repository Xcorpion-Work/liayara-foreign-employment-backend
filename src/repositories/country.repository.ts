import { Country } from "../models/country.model";

export const createCountryRepo = (data: any) => {
    return new Country(data).save();
};

export const updateCountryRepo = (filters: any, data: any) => {
    return Country.findOneAndUpdate(filters, data, {
        new: true,
    }).exec();
};

export const findAllCountriesRepo = (filters: any) => {
    return Country.find(filters).exec();
};

export const findOneCountryRepo = (filters: any) => {
    return Country.findOne(filters).exec();
};

export const aggregateCountryRepo = (pipeline: any) => {
    return Country.aggregate(pipeline).exec();
};
