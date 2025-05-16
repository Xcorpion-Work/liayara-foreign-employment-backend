import { Router } from "express";
import {
    createForeignAgentController,
    getOneForeignAgentController,
    getPagedForeignAgentController,
    updateForeignAgentController,
} from "../controllers/foreignAgent.controller";
import authMiddleware from "../middlewares/auth.middleware";

const foreignAgentRoute = Router();

foreignAgentRoute.post(
    "/foreign-agent",
    authMiddleware(),
    createForeignAgentController
);
foreignAgentRoute.post(
    "/paged-foreign-agents",
    authMiddleware(),
    getPagedForeignAgentController
);
foreignAgentRoute.get(
    "/foreign-agent/:id",
    authMiddleware(),
    getOneForeignAgentController
);
foreignAgentRoute.put(
    "/foreign-agent/:id",
    authMiddleware(),
    updateForeignAgentController
);

export default foreignAgentRoute;
