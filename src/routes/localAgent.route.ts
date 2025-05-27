import { Router } from "express";
import {
    createLocalAgentController,
    getOneLocalAgentController,
    getPagedLocalAgentController,
    updateLocalAgentController,
} from "../controllers/localAgent.controller";
import authMiddleware from "../middlewares/auth.middleware";
import {
    CREATE_LOCAL_AGENT,
    EDIT_LOCAL_AGENT,
    VIEW_LOCAL_AGENT,
} from "../constants/permissions";

const localAgentRoute = Router();

localAgentRoute.post(
    "/local-agent",
    authMiddleware([CREATE_LOCAL_AGENT]),
    createLocalAgentController
);
localAgentRoute.post(
    "/paged-local-agents",
    authMiddleware([VIEW_LOCAL_AGENT]),
    getPagedLocalAgentController
);
localAgentRoute.get(
    "/local-agent/:id",
    authMiddleware([VIEW_LOCAL_AGENT]),
    getOneLocalAgentController
);
localAgentRoute.put(
    "/local-agent/:id",
    authMiddleware([EDIT_LOCAL_AGENT]),
    updateLocalAgentController
);

export default localAgentRoute;
