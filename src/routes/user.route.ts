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
import {
    createRoleController,
    getPagedRolesController,
    getRoleController,
    updateRoleController,
} from "../controllers/role.controller";
import {
    createPermissionController,
    getAllPermissionsController,
} from "../controllers/permission.controller";

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
userRoute.post("/paged-roles", authMiddleware(), getPagedRolesController);
userRoute.put("/role/:id", authMiddleware(), updateRoleController);
userRoute.post("/permission", createPermissionController);
userRoute.get("/permissions", authMiddleware(), getAllPermissionsController);
userRoute.post("/role", authMiddleware(), createRoleController);
userRoute.get("/role/:id", authMiddleware(), getRoleController);

userRoute.put(
    "/change-status/:id",
    authMiddleware(),
    userStatusChangeController
);

export default userRoute;
