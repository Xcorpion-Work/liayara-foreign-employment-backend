import { Router } from "express";
import { createPassengerController } from "../controllers/passenger.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { getPagedLocalAgentController } from "../controllers/localAgent.controller";
import { CREATE_PASSENGER, VIEW_PASSENGER } from "../constants/permissions";

const passengerRoute = Router();

passengerRoute.post(
    "/passenger",
    authMiddleware([CREATE_PASSENGER]),
    createPassengerController
);
passengerRoute.post(
    "/paged-passengers",
    authMiddleware([VIEW_PASSENGER]),
    getPagedLocalAgentController
);

export default passengerRoute;
