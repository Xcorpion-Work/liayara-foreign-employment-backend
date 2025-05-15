import { Router } from "express";
import { createSubAgentController } from "../controllers/subAgent.controller";
import authMiddleware from "../middlewares/auth.middleware";

const subAgentRoute = Router();

subAgentRoute.post("/sub-agent", authMiddleware(), createSubAgentController);

export default subAgentRoute;
