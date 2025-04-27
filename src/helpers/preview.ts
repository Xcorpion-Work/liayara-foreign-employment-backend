import { findRoleRepo } from "../repositories/role.repository";
import { Types } from "mongoose";
import ObjectId = Types.ObjectId;

export const rolePreview = async (role: string) => {
    const savedRole = await findRoleRepo({ _id: new ObjectId(role) });
    return savedRole?.name
        .split("_") // Split the string by underscores
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" "); // Join the words with spaces
};

export const amountPreview = (amount: number): string => {
    if (isNaN(amount)) {
        return "Rs. 0.00";
    }
    return `Rs. ${amount?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
