import { model, Schema } from "mongoose";

export interface IOrganizationData extends Document {
    name: string;
    licenceCode: string;
    address: string;
    phone: string;
    altPhone: string;
    faxNo: string;
    email: string;
    embassyRegNo: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const OrganizationDataSchema: Schema = new Schema<IOrganizationData>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        licenceCode: {
            type: Schema.Types.String,
            required: [true, "Licence code is required"],
        },
        address: {
            type: Schema.Types.String,
            required: [true, "Address code is required"],
        },
        phone: {
            type: Schema.Types.String,
            required: [true, "Phone number is required"],
        },
        altPhone: {
            type: Schema.Types.String,
        },
        faxNo: {
            type: Schema.Types.String,
        },
        email: {
            type: Schema.Types.String,
            required: [true, "Email number is required"],
        },
        embassyRegNo: {
            type: Schema.Types.String,
            required: [true, "Embassy register number is required"],
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "organizationData",
    }
);

export const OrganizationData = model<IOrganizationData>(
    "OrganizationData",
    OrganizationDataSchema
);
