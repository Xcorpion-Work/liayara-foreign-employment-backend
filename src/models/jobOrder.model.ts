import { IForeignAgent } from "./foreignAgent.model";
import { model, Schema } from "mongoose";

export interface IJobOrder extends Document {
    jobOrderId: string;
    foreignAgent: IForeignAgent;
    jobOrderApprovalNumber: string;
    facilities: any;
    jobs: any;
    issuedDate: Date;
    expiredDate: Date;
    reference: any;
    remark: string;
    jobOrderStatus: "PENDING" | "ACTIVE" | "EXPIRED";
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const JobOrderSchema = new Schema<IJobOrder>(
    {
        jobOrderId: {
            type: Schema.Types.String,
            required: [true, "Job order id is required"],
            unique: true,
        },
        foreignAgent: {
            type: Schema.Types.ObjectId,
            ref: "ForeignAgent",
            required: [true, "Foreign agent is required"],
        },
        jobOrderApprovalNumber: {
            type: Schema.Types.String,
            required: [true, "Job order approval number is required"],
        },
        facilities: {
            type: Schema.Types.Mixed,
        },
        jobs: {
            type: [
                {
                    jobCatalogId: {
                        type: Schema.Types.ObjectId,
                        ref: "JobCatalog",
                        required: true,
                    },
                    vacancies: { type: Number, required: true },
                    approvedVacancies: { type: Number, required: true },
                    salary: { type: Number, required: true },
                },
            ],
        },
        issuedDate: {
            type: Schema.Types.Date,
            required: [true, "Issue date is required"],
        },
        expiredDate: {
            type: Schema.Types.Date,
            required: [true, "Expire date is required"],
        },
        reference: {
            type: {
                name: Schema.Types.String,
                filePath: Schema.Types.String,
            },
            required: [true, "Reference is required"],
        },
        remark: {
            type: Schema.Types.String,
        },
        jobOrderStatus: {
            type: Schema.Types.String,
            default: "PENDING",
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "job_orders",
    }
);

export const JobOrder = model<IJobOrder>("JobOrder", JobOrderSchema);
