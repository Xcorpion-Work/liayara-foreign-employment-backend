import { model, Schema } from "mongoose";

export interface IPassengerDocumentType extends Document {
    name: string;
    description: string;
    required: boolean;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PassengerDocumentTypeSchema: Schema = new Schema<IPassengerDocumentType>(
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
        required: {
            type: Schema.Types.Boolean,
            default: true,
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "passenger_document_types",
    }
);

export const PassengerDocumentType = model<IPassengerDocumentType>(
    "PassengerDocumentType",
    PassengerDocumentTypeSchema
);
