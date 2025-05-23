import { model, Schema } from "mongoose";

export interface ILocalAgent extends Document {
    localAgentId: string;
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

const LocalAgentSchema = new Schema<ILocalAgent>(
    {
        localAgentId: {
            type: Schema.Types.String,
            required: [true, "Sub agent id is required"],
            unique: true,
        },
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
        collection: "local_agents",
    }
);

export const LocalAgent = model<ILocalAgent>("LocalAgent", LocalAgentSchema);
