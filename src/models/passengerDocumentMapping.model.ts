import mongoose, { Document, Schema } from "mongoose";
import { IPassenger } from "./passenger.model";
import { IPassengerDocumentType } from "./passengerDocumentType.model";
import { IUser } from "./user.model";
import { errors } from "../constants/errors";

export interface IPassengerDocumentMapping extends Document {
    passengerId: IPassenger;
    documents: {
        documentTypeId: IPassengerDocumentType;
        name: string | null;
        path: string | null;
        isVerified: boolean;
        verifiedBy: IUser;
        rejectedBy: IUser;
        uploadedBy: IUser;
        reason: string;
    }[];
    mappingStatus: "PENDING" | "VERIFIED" | "REJECTED";
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PassengerDocumentMappingSchema = new Schema<IPassengerDocumentMapping>(
    {
        passengerId: {
            type: Schema.Types.ObjectId,
            ref: "Passenger",
            required: [true, "Passenger is required"],
            validate: {
                validator: async function (value: any) {
                    const count = await mongoose
                        .model("Passenger")
                        .countDocuments({ _id: value });
                    return count > 0;
                },
                message: errors.INVALID_PASSENGER,
            },
        },
        documents: {
            type: [
                {
                    documentTypeId: {
                        type: Schema.Types.ObjectId,
                        ref: "PassengerDocumentType",
                        required: true,
                    },
                    name: {
                        type: String,
                        default: null,
                    },
                    path: {
                        type: String,
                        default: null,
                    },
                    isVerified: {
                        type: Boolean,
                        default: false,
                    },
                    verifiedBy: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                    },
                    rejectedBy: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                    },
                    uploadedBy: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                    },
                    reason: {
                        type: String,
                        default: "",
                    },
                },
            ],
            default: [],
        },
        mappingStatus: {
            type: String,
            enum: ["PENDING", "VERIFIED", "REJECTED"],
            default: "PENDING",
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "passenger_document_mappings",
    }
);

export const PassengerDocumentMapping =
    mongoose.model<IPassengerDocumentMapping>(
        "PassengerDocumentMapping",
        PassengerDocumentMappingSchema
    );
