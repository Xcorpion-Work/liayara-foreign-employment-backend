import mongoose, { Document, Schema } from "mongoose";
import { IRole } from "./role.model";
import ObjectId = mongoose.Types.ObjectId;
import { errors } from "../constants/errors";
import { findRoleRepo } from "../repositories/role.repository";

export interface IUser extends Document {
    uuid: string;
    username: string;
    email: string;
    phone: string;
    altPhone: string;
    address: string;
    nic: string;
    dateOfBirth: string;
    remark: string;
    password: string;
    recoveryCode: string;
    role: IRole;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        uuid: {
            type: Schema.Types.String,
            required: [true, "Uuid is required"],
        },
        username: {
            type: Schema.Types.String,
            required: [true, "Username is required"],
        },
        email: {
            type: Schema.Types.String,
            required: [true, "Email is required"],
            unique: true,
        },
        phone: {
            type: Schema.Types.String,
            required: [true, "Phone is required"],
            unique: true,
        },
        altPhone: {
            type: Schema.Types.String,
        },
        address: {
            type: Schema.Types.String,
        },
        nic: {
            type: Schema.Types.String,
            required: [true, "NIC is required"],
        },
        dateOfBirth: {
            type: Schema.Types.String,
            required: [true, "Date of birth is required"],
        },
        remark: {
            type: Schema.Types.String,
        },
        password: {
            type: Schema.Types.String,
            required: [true, "Password is required"],
        },
        recoveryCode: {
            type: Schema.Types.String,
            required: [true, "Recovery code is required"],
        },
        role: {
            type: Schema.Types.ObjectId,
            required: [true, "Role is required"],
            ref: "roles",
            validate: {
                validator: async function (roleId: any) {
                    const role = await findRoleRepo({
                        _id: new ObjectId(roleId),
                    });
                    return !!role;
                },
                message: errors.INVALID_ROLE,
            },
        },
        status: {
            type: Schema.Types.Boolean,
            required: [true, "Status is required"],
        },
    },
    {
        timestamps: true,
        collection: "users",
    }
);

export const User = mongoose.model<IUser>("User", UserSchema);
