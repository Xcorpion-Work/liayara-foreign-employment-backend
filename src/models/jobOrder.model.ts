import { IForeignAgent } from "./foreignAgent.model";
import { model, Schema } from "mongoose";

export interface IJobOrder extends Document {
    jobOrderId: string;
    foreignAgent: IForeignAgent;
    facilities: any;
    jobs: any;
    issueDate: Date;
    expireDate: Date;
    reference: string;
    remark: string;
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
        facilities: {
            type: Schema.Types.Mixed,
        },
        jobs: {
            type: [
                {
                    jobCatalog: {
                        type: Schema.Types.ObjectId,
                        ref: "JobCatalog",
                    },
                    vacancies: {
                        type: Schema.Types.Number,
                    },
                    approvedVacancies: {
                        type: Schema.Types.Number,
                    },
                    salary: {
                        type: Schema.Types.Number,
                    },
                },
            ],
        },
        issueDate: {
            type: Schema.Types.Date,
            required: [true, "Issue date is required"],
        },
        expireDate: {
            type: Schema.Types.Date,
            required: [true, "Expire date is required"],
        },
        reference: {
            type: Schema.Types.String,
            required: [true, "Reference is required"],
        },
    },
    {
        timestamps: true,
        collection: "job_orders",
    }
);

export const JobOrder = model<IJobOrder>("JobOrder", JobOrderSchema);
