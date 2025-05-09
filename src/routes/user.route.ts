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
import {
    CREATE_ROLE,
    CREATE_USER,
    EDIT_ORGANIZATION_DATA,
    EDIT_ROLE,
    EDIT_USER,
    VIEW_ORGANIZATION_DATA,
    VIEW_ROLE,
    VIEW_USER,
} from "../constants/permissions";

const userRoute = Router();

userRoute.post("/signup", authMiddleware([CREATE_USER]), signupController);
userRoute.post("/super-admin-register", signupController);

userRoute.post("/login", loginController);
userRoute.get("/confirm-login", authMiddleware(), confirmLoginController);
userRoute.post("/token-refresh", tokenRefreshController);
userRoute.post("/forgot-password", forgotPasswordController);
userRoute.post("/login-by-forgot-password", loginByForgotPasswordController);
userRoute.post("/change-password", authMiddleware(), changePasswordController);

userRoute.post("/users", authMiddleware([VIEW_USER]), getAllUsersController);
userRoute.post(
    "/paged-users",
    authMiddleware([VIEW_USER]),
    getPagedUsersController
);
userRoute.get("/user/:id", authMiddleware([VIEW_USER]), getUserController);
userRoute.put("/user/:id", authMiddleware([EDIT_USER]), updateUserController);

userRoute.post(
    "/paged-roles",
    authMiddleware([VIEW_ROLE]),
    getPagedRolesController
);
userRoute.put("/role/:id", authMiddleware([EDIT_ROLE]), updateRoleController);
userRoute.post("/role", authMiddleware([CREATE_ROLE]), createRoleController);
userRoute.post("/roles", authMiddleware([VIEW_ROLE]), getAllRolesController);
userRoute.get("/role/:id", authMiddleware([VIEW_ROLE]), getRoleController);

userRoute.post("/permission", createPermissionController);
userRoute.get(
    "/permissions",
    authMiddleware([CREATE_ROLE, EDIT_ROLE]),
    getAllPermissionsController
);

userRoute.post("/organization-data", createOrganizationDataController);
userRoute.get(
    "/organization-data/:id",
    authMiddleware([VIEW_ORGANIZATION_DATA]),
    getOrganizationDataController
);
userRoute.get(
    "/organization-data",
    authMiddleware([VIEW_ORGANIZATION_DATA]),
    getOrganizationDataController
);
userRoute.put(
    "/organization-data/:id",
    authMiddleware([EDIT_ORGANIZATION_DATA]),
    updateOrganizationDataController
);

userRoute.put(
    "/change-status/:id",
    authMiddleware([EDIT_ORGANIZATION_DATA]),
    userStatusChangeController
);

export default userRoute;
