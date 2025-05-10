import {
    createCountryRepo,
    findAllCountriesRepo,
    findOneCountryRepo,
    updateCountryRepo,
} from "../repositories/country.repository";
import { errors } from "../constants/errors";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const createCountryService = async (data: any) => {
    try {
        const existingCountries: any = await findAllCountriesRepo({
            name: data.name,
        });

        if (existingCountries.length > 0) {
            throw new Error(
                errors.COUNTRY_ALREADY_EXIST || "Country already exists"
            );
        }

        return await createCountryRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updateCountryService = async (id: any, data: any) => {
    try {
        const existingCountries = await findAllCountriesRepo({
            name: data.name,
        });

        const isDuplicate = existingCountries.some(
            (doc) => doc._id.toString() !== id.toString()
        );

        if (isDuplicate) {
            throw new Error(
                errors.COUNTRY_ALREADY_EXIST || "Country already exists"
            );
        }

        return await updateCountryRepo({ _id: new ObjectId(id) }, data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findAllCountriesService = async (data: any) => {
    try {
        const { filters } = data;
        return await findAllCountriesRepo(filters);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findCountryService = async (id: any) => {
    try {
        return await findOneCountryRepo({
            _id: new ObjectId(id),
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
};
