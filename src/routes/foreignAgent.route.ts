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
    EDIT_FOREIGN_AGENT,
    VIEW_FOREIGN_AGENT,
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
    authMiddleware([CREATE_FOREIGN_AGENT]),
    createJobOrderController
);
foreignAgentRoute.post(
    "/paged-job-orders",
    authMiddleware([VIEW_FOREIGN_AGENT]),
    getPagedJobOrderController
);
foreignAgentRoute.post(
    "/job-order",
    authMiddleware([VIEW_FOREIGN_AGENT]),
    getAllJobOrderController
);
foreignAgentRoute.get(
    "/job-order/:id",
    authMiddleware([VIEW_FOREIGN_AGENT]),
    getOneJobOrderController
);
foreignAgentRoute.put(
    "/job-order/:id",
    authMiddleware([EDIT_FOREIGN_AGENT]),
    updateJobOrderController
);

export default foreignAgentRoute;
