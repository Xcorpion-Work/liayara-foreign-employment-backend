import { IPassenger } from "./passenger.model";
import { IJobOrder } from "./jobOrder.model";
import { IJobCatalog } from "./jobCatalog.model";
import { model, Schema } from "mongoose";

export interface IPassengerJobMapping extends Document {
    passengerId: IPassenger;
    jobOrderId: IJobOrder;
    jobCatalogId: IJobCatalog;
    agreedCommission: number;
    agreedFee: number;
    salary: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PassengerJobMappingSchema = new Schema<IPassengerJobMapping>(
    {
        passengerId: {
            type: Schema.Types.ObjectId,
            ref: "Passenger",
        },
        jobOrderId: {
            type: Schema.Types.ObjectId,
            ref: "JobOrder",
        },
        jobCatalogId: {
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
        collection: "passenger_job_mappings",
    }
);

export const PassengerJobMapping = model<IPassengerJobMapping>(
    "PassengerJobMapping",
    PassengerJobMappingSchema
);
