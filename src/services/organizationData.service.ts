import {
    createOrganizationDataRepo,
    getOrganizationDataRepo,
    getOrganizationsDataRepo,
    updateOrganizationDataRepo,
} from "../repositories/organizationData.repository";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const createOrganizationDataService = async (data: any) => {
    try {
        return await createOrganizationDataRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updateOrganizationDataService = async (id: any, data: any) => {
    try {
        return await updateOrganizationDataRepo(
            { _id: new ObjectId(id) },
            data
        );
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getOrganizationDataService = async (id: any) => {
    try {
        return await getOrganizationDataRepo({ _id: new ObjectId(id) });
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getRelevantOrganizationData = async () => {
    try {
        const organizations: any = await getOrganizationsDataRepo({});
        return organizations[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
};
