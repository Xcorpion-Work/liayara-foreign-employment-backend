import { Router } from "express";
import {
    changePasswordController,
    confirmLoginController,
    forgotPasswordController,
    getAllUsersController,
    getPagedUsersController,
    getUserController,
    loginByForgotPasswordController,
    loginController,
    signupController,
    tokenRefreshController,
    updateUserController,
    userStatusChangeController,
} from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import {
    createRoleController,
    getAllRolesController,
    getPagedRolesController,
    getRoleController,
    updateRoleController,
} from "../controllers/role.controller";
import {
    createPermissionController,
    getAllPermissionsController,
} from "../controllers/permission.controller";
import {
    createOrganizationDataController,
    getOrganizationDataController,
    updateOrganizationDataController,
} from "../controllers/organizationData.controller";

const userRoute = Router();

userRoute.post("/signup", signupController);
userRoute.post("/super-admin-register", signupController);

userRoute.post("/login", loginController);
userRoute.get("/confirm-login", authMiddleware(), confirmLoginController);
userRoute.post("/token-refresh", tokenRefreshController);
userRoute.post("/forgot-password", forgotPasswordController);
userRoute.post("/login-by-forgot-password", loginByForgotPasswordController);
userRoute.post("/change-password", authMiddleware(), changePasswordController);

userRoute.post("/users", authMiddleware(), getAllUsersController);
userRoute.post("/paged-users", authMiddleware(), getPagedUsersController);
userRoute.get("/user/:id", authMiddleware(), getUserController);
userRoute.put("/user/:id", authMiddleware(), updateUserController);

userRoute.post("/paged-roles", authMiddleware(), getPagedRolesController);
userRoute.put("/role/:id", authMiddleware(), updateRoleController);
userRoute.post("/role", authMiddleware(), createRoleController);
userRoute.post("/roles", authMiddleware(), getAllRolesController);
userRoute.get("/role/:id", authMiddleware(), getRoleController);

userRoute.post("/permission", createPermissionController);
userRoute.get("/permissions", authMiddleware(), getAllPermissionsController);

userRoute.post("/organization-data", createOrganizationDataController);
userRoute.get(
    "/organization-data/:id",
    authMiddleware(),
    getOrganizationDataController
);
userRoute.get(
    "/organization-data",
    authMiddleware(),
    getOrganizationDataController
);
userRoute.put(
    "/organization-data/:id",
    authMiddleware(),
    updateOrganizationDataController
);

userRoute.put(
    "/change-status/:id",
    authMiddleware(),
    userStatusChangeController
);

export default userRoute;
