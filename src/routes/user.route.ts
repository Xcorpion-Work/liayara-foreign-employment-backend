import { Router } from "express";
import {
    changePasswordController,
    confirmLoginController,
    forgotPasswordController,
    getAllUsersController,
    loginByForgotPasswordController,
    loginController,
    signupController,
    tokenRefreshController,
    userStatusChangeController,
} from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRoute = Router();

userRoute.post("/signup", signupController);
userRoute.post("/super-admin-register", signupController);
userRoute.post("/login", loginController);
userRoute.post("/login-by-forgot-password", loginByForgotPasswordController);
userRoute.post("/forgot-password", forgotPasswordController);
userRoute.get("/confirm-login", authMiddleware(), confirmLoginController);
userRoute.post("/token-refresh", tokenRefreshController);
userRoute.post("/change-password", authMiddleware(), changePasswordController);
userRoute.post("/users", authMiddleware(), getAllUsersController);
userRoute.put(
    "/change-status/:id",
    authMiddleware(),
    userStatusChangeController
);

export default userRoute;
