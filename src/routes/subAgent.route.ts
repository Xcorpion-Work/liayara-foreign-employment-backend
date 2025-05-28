import { Router } from "express";
import {
    createSubAgentController, getAllSubAgentsController,
    getOneSubAgentController,
    getPagedSubAgentController,
    updateSubAgentController,
} from "../controllers/subAgent.controller";
import authMiddleware from "../middlewares/auth.middleware";

const subAgentRoute = Router();

subAgentRoute.post("/sub-agent", authMiddleware(), createSubAgentController);
subAgentRoute.post("/sub-agents", authMiddleware(), getAllSubAgentsController);
subAgentRoute.post(
    "/paged-sub-agents",
    authMiddleware(),
    getPagedSubAgentController
);
subAgentRoute.get("/sub-agent/:id", authMiddleware(), getOneSubAgentController);
subAgentRoute.put("/sub-agent/:id", authMiddleware(), updateSubAgentController);

export default subAgentRoute;
