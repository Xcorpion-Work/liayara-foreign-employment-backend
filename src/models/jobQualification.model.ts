import { model, Schema } from "mongoose";

export interface IJobQualification extends Document {
    name: string;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const JobQualificationSchema = new Schema<IJobQualification>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
            unique: true,
        },
        description: {
            type: Schema.Types.String,
            required: [true, "Description is required"],
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "job_qualifications",
    }
);

export const JobQualification = model<IJobQualification>(
    "JobQualification",
    JobQualificationSchema
);
