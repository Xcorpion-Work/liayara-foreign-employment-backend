import { ICountry } from "./country.model";
import { model, Schema } from "mongoose";

export interface IForeignAgent extends Document {
    foreignAgentId: string;
    name: string;
    company: string;
    country: ICountry;
    phone: string;
    altPhone: string;
    email: string;
    fax: string;
    address: string;
    remark: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ForeignAgentSchema = new Schema<IForeignAgent>(
    {
        foreignAgentId: {
            type: Schema.Types.String,
            required: [true, "Foreign agent id is required"],
            unique: true,
        },
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        company: {
            type: Schema.Types.String,
        },
        country: {
            type: Schema.Types.ObjectId,
            required: [true, "Country is required"],
        },
        phone: {
            type: Schema.Types.String,
            required: [true, "Phone is required"],
            unique: true,
        },
        altPhone: {
            type: Schema.Types.String,
        },
        email: {
            type: Schema.Types.String,
        },
        fax: {
            type: Schema.Types.String,
        },
        address: {
            type: Schema.Types.String,
        },
        remark: {
            type: Schema.Types.String,
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "foreign_agents",
    }
);

export const ForeignAgent = model<IForeignAgent>(
    "ForeignAgent",
    ForeignAgentSchema
);
