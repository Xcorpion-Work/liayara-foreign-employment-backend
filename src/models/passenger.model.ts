import { ISubAgent } from "./subAgent.model";
import { IJobCatalog } from "./jobCatalog.model";
import { ICountry } from "./country.model";
import { Schema, model, Document } from "mongoose";

export interface IPassenger extends Document {
    passengerId: string;
    subAgent: ISubAgent;
    name: string;
    phone: string;
    altPhone: string;
    email: string;
    address: string;
    gender: string;
    birthday: string;
    maritalStatus: string;
    noOfChildren: number;
    height: number;
    weight: number;
    covidVaccinated: boolean;
    abroadExperience: boolean;
    desiredJob: IJobCatalog;
    desiredCountry: ICountry;
    agreedCommission: number;
    agreedFee: number;
    salary: number;
    passengerStatus: string;
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
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
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
            unique: true,
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
            type: Schema.Types.String,
            required: [true, "Birthday is required"],
        },
        maritalStatus: {
            type: Schema.Types.String,
            required: [true, "Marital status is required"],
            enum: ["Single", "Married", "Divorced", "Widowed"],
        },
        noOfChildren: {
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
        desiredJob: {
            type: Schema.Types.ObjectId,
            ref: "JobCatalog",
        },
        desiredCountry: {
            type: Schema.Types.ObjectId,
            ref: "Country",
        },
        agreedCommission: {
            type: Schema.Types.Number,
        },
        agreedFee: {
            type: Schema.Types.Number,
        },
        salary: {
            type: Schema.Types.Number,
            required: [true, "Salary is required"],
        },
        passengerStatus: {
            type: Schema.Types.String,
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
