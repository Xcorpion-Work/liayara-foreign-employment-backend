import { model, Schema } from "mongoose";

export interface IPermission extends Document {
    module: string;
    name: string;
    code: string;
    column: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PermissionSchema: Schema = new Schema<IPermission>(
    {
        module: {
            type: Schema.Types.String,
            required: [true, "Module is required"],
        },
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        code: {
            type: Schema.Types.String,
            required: [true, "Code is required"],
        },
        column: {
            type: Schema.Types.String,
            required: [true, "Column is required"],
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "permissions",
    }
);

export const Permission = model<IPermission>("Permission", PermissionSchema);
