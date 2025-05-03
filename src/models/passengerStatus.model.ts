import { model, Schema } from "mongoose";

export interface IPassengerStatus extends Document {
    name: string;
    code: string;
    sequence: number;
    isFinale: boolean;
    roles: any;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PassengerStatusSchema: Schema = new Schema<IPassengerStatus>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        code: {
            type: Schema.Types.String,
            required: [true, "Code is required"],
        },
        sequence: {
            type: Schema.Types.Number,
            required: [true, "Sequence is requires"],
        },
        isFinale: {
            type: Schema.Types.Boolean,
            required: [true, "Is finale is required"],
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "roles",
            },
        ],
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "passenger_statuses",
    }
);

export const PassengerStatus = model<IPassengerStatus>(
    "PassengerStatus",
    PassengerStatusSchema
);
