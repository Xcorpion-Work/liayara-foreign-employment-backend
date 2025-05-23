import { Router } from "express";
import {
    createLocalAgentController,
    getOneLocalAgentController,
    getPagedLocalAgentController,
    updateLocalAgentController,
} from "../controllers/localAgent.controller";
import authMiddleware from "../middlewares/auth.middleware";

const localAgentRoute = Router();

localAgentRoute.post(
    "/local-agent",
    authMiddleware(),
    createLocalAgentController
);
localAgentRoute.post(
    "/paged-local-agents",
    authMiddleware(),
    getPagedLocalAgentController
);
localAgentRoute.get(
    "/local-agent/:id",
    authMiddleware(),
    getOneLocalAgentController
);
localAgentRoute.put(
    "/local-agent/:id",
    authMiddleware(),
    updateLocalAgentController
);

export default localAgentRoute;
