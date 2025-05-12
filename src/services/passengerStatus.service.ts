import {
    createPassengerStatusRepo,
    findAllPassengerStatusRepo,
    findPassengerStatusRepo,
    updatePassengerStatusRepo,
} from "../repositories/passengerStatus.repository";
import { errors } from "../constants/errors";
import mongoose from "mongoose";

import ObjectId = mongoose.Types.ObjectId;
import { findRoleRepo } from "../repositories/role.repository";

export const createPassengerStatusService = async (data: any) => {
    try {
        const existingStatus = await findPassengerStatusRepo({
            name: data.name,
        });
        if (existingStatus) {
            throw new Error(errors.PASSENGER_STATUS_EXIST);
        }
        const superAdmin: any = await findRoleRepo({ name: "Super Admin" });
        data.roles = [superAdmin._id];
        return await createPassengerStatusRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updatePassengerStatusService = async (id: any, data: any) => {
    try {
        return await updatePassengerStatusRepo({ _id: new ObjectId(id) }, data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findAllPassengerStatusService = async (data: any) => {
    try {
        const { filters } = data;
        return await findAllPassengerStatusRepo(filters);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const findPassengerStatusService = async (id: any) => {
    try {
        return await findPassengerStatusRepo({ _id: new ObjectId(id) });
    } catch (e) {
        console.error(e);
        throw e;
    }
};
