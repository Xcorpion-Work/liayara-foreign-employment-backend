import { model, Schema, Document } from "mongoose";

export interface IJobCatalog extends Document {
    name: string;
    ageLimit?: {
        from: number;
        to: number;
    };
    specification?: string;
    gender: "Male" | "Female";
    doesChargeByPassenger: boolean;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const JobCatalogSchema = new Schema<IJobCatalog>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
            unique: true,
        },
        ageLimit: {
            from: {
                type: Schema.Types.Number,
            },
            to: {
                type: Schema.Types.Number,
            },
        },
        specification: {
            type: Schema.Types.String,
        },
        gender: {
            type: Schema.Types.String,
            required: [true, "Gender is required"],
            enum: ["Male", "Female"],
        },
        doesChargeByPassenger: {
            type: Schema.Types.Boolean,
            default: false,
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "job_catalogs",
    }
);

export const JobCatalog = model<IJobCatalog>("JobCatalog", JobCatalogSchema);
