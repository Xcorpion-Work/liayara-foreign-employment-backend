import { ISubAgent } from "./subAgent.model";
import { IJobCatalog } from "./jobCatalog.model";
import { ICountry } from "./country.model";
import { Schema, model, Document } from "mongoose";
import { ILocalAgent } from "./localAgent.model";
import { IJobOrder } from "./jobOrder.model";

export interface IPassenger extends Document {
    passengerId: string;
    subAgent: ISubAgent;
    localAgent: ILocalAgent;
    name: string;
    nic: string;
    phone: string;
    altPhone: string;
    email: string;
    address: string;
    gender: string;
    birthday: Date;
    religion: string;
    maritalStatus: string;
    numberOfChildren: number;
    height: number;
    weight: number;
    covidVaccinated: boolean;
    abroadExperience: boolean;
    desiredJobs: IJobCatalog[];
    desiredCountries: ICountry[];
    passengerStatus: string;
    isCompletedDetails: boolean;
    selectedJobOrderId: IJobOrder;
    selectedJobCatalogId: IJobCatalog;
    agreedCommission: number;
    agreedFee: number;
    salary: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PassengerSchema = new Schema<IPassenger>(
    {
        passengerId: {
            type: Schema.Types.String,
            required: [true, "Passenger id is required"],
        },
        subAgent: {
            type: Schema.Types.ObjectId,
            ref: "SubAgent",
        },
        localAgent: {
            type: Schema.Types.ObjectId,
            ref: "LocalAgent",
        },
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        nic: {
            type: Schema.Types.String,
            required: [true, "NIC is required"],
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
        address: {
            type: Schema.Types.String,
        },
        gender: {
            type: Schema.Types.String,
            required: [true, "Gender is required"],
            enum: ["Male", "Female"],
        },
        birthday: {
            type: Schema.Types.Date,
            required: [true, "Birthday is required"],
        },
        religion: {
            type: Schema.Types.String,
            required: [true, "Religion is required"],
        },
        maritalStatus: {
            type: Schema.Types.String,
            required: [true, "Marital status is required"],
            enum: ["Single", "Married", "Divorced", "Widowed"],
        },
        numberOfChildren: {
            type: Schema.Types.Number,
        },
        height: {
            type: Schema.Types.Number,
            required: [true, "Height is required"],
        },
        weight: {
            type: Schema.Types.Number,
            required: [true, "Weight is required"],
        },
        covidVaccinated: {
            type: Schema.Types.Boolean,
            default: false,
        },
        abroadExperience: {
            type: Schema.Types.Boolean,
            default: false,
        },
        desiredJobs: [
            {
                type: Schema.Types.ObjectId,
                ref: "JobCatalog",
            },
        ],
        desiredCountries: [
            {
                type: Schema.Types.ObjectId,
                ref: "Country",
            },
        ],
        passengerStatus: {
            type: Schema.Types.String,
        },
        isCompletedDetails: {
            type: Schema.Types.Boolean,
            default: false,
        },
        selectedJobOrderId: {
            type: Schema.Types.ObjectId,
            ref: "JobOrder",
        },
        selectedJobCatalogId: {
            type: Schema.Types.ObjectId,
            ref: "JobCatalog",
        },
        agreedCommission: {
            type: Schema.Types.Number,
        },
        agreedFee: {
            type: Schema.Types.Number,
        },
        salary: {
            type: Schema.Types.Number,
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "passengers",
    }
);

export const Passenger = model<IPassenger>("Passenger", PassengerSchema);
