import { Router } from "express";
import {
    createForeignAgentController,
    getAllForeignAgentController,
    getOneForeignAgentController,
    getPagedForeignAgentController,
    updateForeignAgentController,
} from "../controllers/foreignAgent.controller";
import authMiddleware from "../middlewares/auth.middleware";
import {
    CREATE_FOREIGN_AGENT,
    CREATE_JOB_ORDER,
    EDIT_FOREIGN_AGENT,
    EDIT_JOB_ORDER,
    VIEW_FOREIGN_AGENT,
    VIEW_JOB_ORDER,
} from "../constants/permissions";
import {
    createJobOrderController,
    getAllJobOrderController,
    getOneJobOrderController,
    getPagedJobOrderController,
    updateJobOrderController,
} from "../controllers/jobOrder.controller";

const foreignAgentRoute = Router();

foreignAgentRoute.post(
    "/foreign-agent",
    authMiddleware([CREATE_FOREIGN_AGENT]),
    createForeignAgentController
);
foreignAgentRoute.post(
    "/paged-foreign-agents",
    authMiddleware([VIEW_FOREIGN_AGENT]),
    getPagedForeignAgentController
);
foreignAgentRoute.post(
    "/foreign-agents",
    authMiddleware([VIEW_FOREIGN_AGENT]),
    getAllForeignAgentController
);
foreignAgentRoute.get(
    "/foreign-agent/:id",
    authMiddleware([VIEW_FOREIGN_AGENT]),
    getOneForeignAgentController
);
foreignAgentRoute.put(
    "/foreign-agent/:id",
    authMiddleware([EDIT_FOREIGN_AGENT]),
    updateForeignAgentController
);
foreignAgentRoute.post(
    "/job-order",
    authMiddleware([CREATE_JOB_ORDER]),
    createJobOrderController
);
foreignAgentRoute.post(
    "/paged-job-orders",
    authMiddleware([VIEW_JOB_ORDER]),
    getPagedJobOrderController
);
foreignAgentRoute.post(
    "/job-order",
    authMiddleware([VIEW_JOB_ORDER]),
    getAllJobOrderController
);
foreignAgentRoute.get(
    "/job-order/:id",
    authMiddleware([VIEW_JOB_ORDER]),
    getOneJobOrderController
);
foreignAgentRoute.put(
    "/job-order/:id",
    authMiddleware([EDIT_JOB_ORDER]),
    updateJobOrderController
);

export default foreignAgentRoute;
