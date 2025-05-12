import { model, Schema } from "mongoose";

export interface ICountry extends Document {
    name: string;
    code: string;
    currency: any;
    language: any;
    flag: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CountrySchema = new Schema<ICountry>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
            unique: true,
        },
        code: {
            type: Schema.Types.String,
            required: [true, "Code is required"],
            unique: true,
        },
        currency: {
            type: {
                code: Schema.Types.String,
                name: Schema.Types.String,
                symbol: Schema.Types.String,
            },
        },
        language: {
            type: {
                code: Schema.Types.String,
                name: Schema.Types.String,
            },
        },
        flag: {
            type: Schema.Types.String,
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "countries",
    }
);

export const Country = model<ICountry>("Country", CountrySchema);
