import { model, Schema } from "mongoose";

export interface ISubAgent extends Document {
    name: string;
    phone: string;
    altPhone: string;
    email: string;
    address: string;
    remark: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const SubAgentSchema = new Schema<ISubAgent>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        phone: {
            type: Schema.Types.String,
            required: [true, "Phone is required"],
            unique: true,
        },
        altPhone: {
            type: Schema.Types.String,
        },
        email: {
            type: Schema.Types.String,
        },
        address: {
            type: Schema.Types.String,
        },
        remark: {
            type: Schema.Types.String,
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "sub_agents",
    }
);

export const SubAgent = model<ISubAgent>("SubAgent", SubAgentSchema);
