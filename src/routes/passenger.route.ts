import { Router } from "express";
import {
    createPassengerController,
    getAllJobsForPassengerController,
    getOnePassengerController,
    getPagedPassengerController,
    selectJobForPassengerController,
    updatePassengerController,
} from "../controllers/passenger.controller";
import authMiddleware from "../middlewares/auth.middleware";
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
    getPagedPassengerController
);
passengerRoute.get(
    "/passenger/:id",
    authMiddleware(),
    getOnePassengerController
);
passengerRoute.put(
    "/passenger/:id",
    authMiddleware(),
    updatePassengerController
);
passengerRoute.post(
    "/jobs",
    authMiddleware(),
    getAllJobsForPassengerController
);
passengerRoute.post(
    "/select-job",
    authMiddleware(),
    selectJobForPassengerController
);

export default passengerRoute;
