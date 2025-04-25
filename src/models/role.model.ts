import mongoose, { Document, Schema } from "mongoose";

export interface IRole extends Document {
    uuid: string;
    name: string;
    description: string;
    status: boolean;
}

const RoleSchema: Schema = new Schema<IRole>(
    {
        uuid: {
            type: Schema.Types.String,
            required: [true, "Uuid is required"],
        },
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        description: {
            type: Schema.Types.String,
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "roles",
    }
);

export const Role = mongoose.model<IRole>("Role", RoleSchema);
