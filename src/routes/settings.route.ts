import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
    createPassengerStatusController,
    getAllPassengerStatusController,
    getPassengerStatusController,
    updatePassengerStatusController,
} from "../controllers/passengerStatus.controller";
import {
    createPassengerDocumentTypeController,
    getAllPassengerDocumentTypeController,
    getPassengerDocumentTypeController,
    updatePassengerDocumentTypeController,
} from "../controllers/passengerDocumentType.Controller";
import {
    createJobCatalogController,
    getAllJobCatalogController,
    getJobCatalogController,
    updateJobCatalogController,
} from "../controllers/jobCatalog.controller";
import {
    CREATE_JOB_CATALOG,
    CREATE_PASSENGER_DOCUMENT_TYPE,
    EDIT_JOB_CATALOG,
    EDIT_PASSENGER_DOCUMENT_TYPE,
    EDIT_PASSENGER_STATUS,
    VIEW_JOB_CATALOG,
    VIEW_PASSENGER_DOCUMENT_TYPE,
    VIEW_PASSENGER_STATUS,
} from "../constants/permissions";

const settingsRoute = Router();

settingsRoute.post("/passenger-status", createPassengerStatusController);
settingsRoute.post(
    "/passenger-statuses",
    authMiddleware([VIEW_PASSENGER_STATUS]),
    getAllPassengerStatusController
);
settingsRoute.put(
    "/passenger-status/:id",
    authMiddleware([EDIT_PASSENGER_STATUS]),
    updatePassengerStatusController
);
settingsRoute.get(
    "/passenger-status/:id",
    authMiddleware([VIEW_PASSENGER_STATUS]),
    getPassengerStatusController
);
settingsRoute.post(
    "/passenger-document-type",
    authMiddleware([CREATE_PASSENGER_DOCUMENT_TYPE]),
    createPassengerDocumentTypeController
);
settingsRoute.get(
    "/passenger-document-type/:id",
    authMiddleware([VIEW_PASSENGER_DOCUMENT_TYPE]),
    getPassengerDocumentTypeController
);
settingsRoute.put(
    "/passenger-document-type/:id",
    authMiddleware([EDIT_PASSENGER_DOCUMENT_TYPE]),
    updatePassengerDocumentTypeController
);
settingsRoute.post(
    "/passenger-document-types",
    authMiddleware([VIEW_PASSENGER_DOCUMENT_TYPE]),
    getAllPassengerDocumentTypeController
);
settingsRoute.post(
    "/job-catalog",
    authMiddleware([CREATE_JOB_CATALOG]),
    createJobCatalogController
);
settingsRoute.put(
    "/job-catalog/:id",
    authMiddleware([EDIT_JOB_CATALOG]),
    updateJobCatalogController
);
settingsRoute.get(
    "/job-catalog/:id",
    authMiddleware([VIEW_JOB_CATALOG]),
    getJobCatalogController
);
settingsRoute.post(
    "/job-catalogs",
    authMiddleware([VIEW_JOB_CATALOG]),
    getAllJobCatalogController
);

export default settingsRoute;
