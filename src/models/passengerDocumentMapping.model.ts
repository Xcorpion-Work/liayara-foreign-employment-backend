import mongoose, { Document, Schema } from "mongoose";
import { IPassenger } from "./passenger.model";
import { IPassengerDocumentType } from "./passengerDocumentType.model";
import { errors } from "../constants/errors";
import { IUser } from "./user.model";

export interface IPassengerDocumentMapping extends Document {
    passenger: mongoose.Types.ObjectId | IPassenger;
    documents: {
        documentType: mongoose.Types.ObjectId | IPassengerDocumentType;
        name: string | null;
        path: string | null;
        isVerified: boolean;
        isRejected: boolean;
        doneBy: mongoose.Types.ObjectId | IUser;
        reason: string;
        doneAt: Date;
    }[];
    allDocumentsSubmitted: boolean;
    allDocumentVerified: boolean;
    mappingStatus:
        | "PENDING"
        | "COMPLETED"
        | "VERIFYING"
        | "VERIFIED"
        | "REJECTED";
    reason: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PassengerDocumentMappingSchema = new Schema<IPassengerDocumentMapping>(
    {
        passenger: {
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
                    documentType: {
                        type: Schema.Types.ObjectId,
                        ref: "PassengerDocumentType",
                        required: true,
                    },
                    name: {
                        type: String,
                    },
                    path: {
                        type: String,
                    },
                    isVerified: {
                        type: Boolean,
                        default: false,
                    },
                    isRejected: {
                        type: Boolean,
                        default: false,
                    },
                    doneBy: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                    },
                    doneAt: {
                        type: Schema.Types.Date,
                    },
                    reason: {
                        type: String,
                    },
                },
            ],
            default: [],
        },
        allDocumentsSubmitted: {
            type: Boolean,
            default: false,
        },
        allDocumentVerified: {
            type: Boolean,
            default: false,
        },
        mappingStatus: {
            type: Schema.Types.String,
            default: "PENDING",
        },
        reason: {
            type: Schema.Types.String,
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
