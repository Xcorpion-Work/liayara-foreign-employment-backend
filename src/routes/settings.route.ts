import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
    createPassengerStatusController,
    getAllPassengerStatusController,
    getPassengerStatusController,
    updatePassengerStatusController,
} from "../controllers/passengerStatus.controller";

const settingsRoute = Router();

settingsRoute.post("/passenger-status", createPassengerStatusController);
settingsRoute.post(
    "/passenger-statuses",
    authMiddleware(),
    getAllPassengerStatusController
);
settingsRoute.put(
    "/passenger-status/:id",
    authMiddleware(),
    updatePassengerStatusController
);
settingsRoute.get(
    "/passenger-status/:id",
    authMiddleware(),
    getPassengerStatusController
);

export default settingsRoute;
