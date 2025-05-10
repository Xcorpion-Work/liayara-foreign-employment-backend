import { model, Schema } from "mongoose";

export interface ILanguageQualification extends Document {
    name: string;
    code: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const LanguageQualificationSchema = new Schema<ILanguageQualification>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        code: {
            type: Schema.Types.String,
            required: [true, "Code is required"],
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "language_qualifications",
    }
);

export const LanguageQualification = model<ILanguageQualification>(
    "LanguageQualification",
    LanguageQualificationSchema
);
