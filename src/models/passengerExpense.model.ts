import { IPassenger } from "./passenger.model";
import { model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IPassengerExpense extends Document {
    passenger: IPassenger;
    name: string;
    reason: string;
    amount: number;
    receivingBy: string;
    givenBy: IUser;
    expensesStatus: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PassengerExpenseSchema = new Schema<IPassengerExpense>(
    {
        passenger: {
            type: Schema.Types.ObjectId,
            ref: "Passenger",
        },
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        reason: {
            type: Schema.Types.String,
            required: [true, "Reason is required"],
        },
        amount: {
            type: Schema.Types.Number,
            required: [true, "Amount is required"],
        },
        receivingBy: {
            type: Schema.Types.String,
        },
        givenBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        expensesStatus: {
            type: Schema.Types.String,
            enum: ["PENDING", "APPROVED", "REJECTED", "PAID"],
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "passenger_expenses",
    }
);

export const PassengerExpense = model<IPassengerExpense>(
    "PassengerExpense",
    PassengerExpenseSchema
);
