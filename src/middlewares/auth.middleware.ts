import { IRequest, IResponse } from "../interfaces/dto";
import { NextFunction } from "express";
import { sendResponse } from "../helpers/sendResponse";
import jwt from "jsonwebtoken";
import { findUserByUuidService } from "../services/user.service";

const authMiddleware = (permissions: string[] = []) => {
    return async (
        req: IRequest,
        res: IResponse,
        next: NextFunction
    ): Promise<void> => {
        const ACCESS_TOKEN_SECRET: string = process.env.access_secret as string;

        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                sendResponse(
                    res,
                    401,
                    "Unauthorized: No token provided",
                    null,
                    "Unauthorized: No token provided"
                );
                return;
            }

            const accessToken = authHeader.split(" ")[1];
            const decodedToken: any = jwt.verify(
                accessToken,
                ACCESS_TOKEN_SECRET
            );
            req.user = await findUserByUuidService(decodedToken.uuid);

            if (!req.user) {
                sendResponse(
                    res,
                    401,
                    "Unauthorized: User not found",
                    null,
                    "Unauthorized: User not found"
                );
                return;
            }

            // Permission check
            if (permissions.length > 0) {
                const userPermissions = req.user?.permissionCodes || [];

                const hasAnyPermission = permissions.some((permission) =>
                    userPermissions.includes(permission)
                );

                if (!hasAnyPermission) {
                    sendResponse(
                        res,
                        403,
                        "Forbidden: Insufficient permissions",
                        null,
                        "Forbidden: Insufficient permissions"
                    );
                    return;
                }
            }

            next();
        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
                sendResponse(
                    res,
                    401,
                    "Unauthorized: Token has expired",
                    null,
                    "Unauthorized"
                );
            } else if (error.name === "JsonWebTokenError") {
                sendResponse(
                    res,
                    401,
                    "Unauthorized: Invalid token",
                    null,
                    "Unauthorized: Token has expired"
                );
            } else {
                console.error(
                    "Unexpected error during token verification:",
                    error
                );
                sendResponse(
                    res,
                    500,
                    "Internal Server Error",
                    null,
                    "Internal Server Error"
                );
            }
        }
    };
};

export default authMiddleware;
