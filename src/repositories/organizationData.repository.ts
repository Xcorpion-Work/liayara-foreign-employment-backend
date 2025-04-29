import { OrganizationData } from "../models/organizationData.model";

export const createOrganizationDataRepo = (data: any) => {
    return new OrganizationData(data).save();
};

export const updateOrganizationDataRepo = (filters: any, data: any) => {
    return OrganizationData.findOneAndUpdate(filters, data, {
        new: true,
    }).exec();
};

export const getOrganizationDataRepo = (filters: any) => {
    return OrganizationData.findOne(filters).exec();
};
export const getOrganizationsDataRepo = (filters: any) => {
    return OrganizationData.find(filters).exec();
};

export const aggregateOrganizationDataRepo = (pipeline: any) => {
    return OrganizationData.aggregate(pipeline).exec();
};
