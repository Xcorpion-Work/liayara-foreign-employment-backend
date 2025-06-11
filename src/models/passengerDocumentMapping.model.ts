import mongoose, { Document, Schema } from "mongoose";
import { IPassenger } from "./passenger.model";
import { IPassengerDocumentType } from "./passengerDocumentType.model";
import { errors } from "../constants/errors";

export interface IPassengerDocumentMapping extends Document {
    passenger: mongoose.Types.ObjectId | IPassenger;
    documents: {
        documentType: mongoose.Types.ObjectId | IPassengerDocumentType;
        name: string | null;
        path: string | null;
        isVerified: boolean;
    }[];
    allDocumentsSubmitted: boolean;
    allDocumentVerified: boolean;
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
