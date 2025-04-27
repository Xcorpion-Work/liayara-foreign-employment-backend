import { model, Schema } from "mongoose";

export interface IRole extends Document {
    name: string;
    permissions: any;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const RoleSchema: Schema = new Schema<IRole>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        permissions: [
            {
                type: Schema.Types.ObjectId,
                ref: "permissions",
            },
        ],
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

export const Role = model<IRole>("Role", RoleSchema);
