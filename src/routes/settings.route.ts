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
    CREATE_COUNTRY,
    CREATE_JOB_CATALOG,
    CREATE_PASSENGER_DOCUMENT_TYPE,
    CREATE_QUALIFICATION,
    EDIT_COUNTRY,
    EDIT_JOB_CATALOG,
    EDIT_PASSENGER_DOCUMENT_TYPE,
    EDIT_PASSENGER_STATUS,
    EDIT_QUALIFICATION,
    VIEW_COUNTRY,
    VIEW_JOB_CATALOG,
    VIEW_PASSENGER_DOCUMENT_TYPE,
    VIEW_PASSENGER_STATUS,
    VIEW_QUALIFICATION,
} from "../constants/permissions";
import {
    createCountryController,
    getAllCountriesController,
    getCountryController,
    updateCountryController,
} from "../controllers/country.controller";
import {
    createLanguageQualificationController,
    getAllLanguageQualificationController,
    getLanguageQualificationController,
    updateLanguageQualificationController,
} from "../controllers/languageQualification.controller";
import {
    createJobQualificationController,
    getAllJobQualificationController,
    getJobQualificationController,
    updateJobQualificationController,
} from "../controllers/jobQualification.controller";

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
settingsRoute.post(
    "/country",
    authMiddleware([CREATE_COUNTRY]),
    createCountryController
);
settingsRoute.put(
    "/country/:id",
    authMiddleware([EDIT_COUNTRY]),
    updateCountryController
);
settingsRoute.get(
    "/country/:id",
    authMiddleware([VIEW_COUNTRY]),
    getCountryController
);
settingsRoute.post(
    "/countries",
    authMiddleware([VIEW_COUNTRY]),
    getAllCountriesController
);
settingsRoute.post(
    "/language-qualification",
    authMiddleware([CREATE_QUALIFICATION]),
    createLanguageQualificationController
);

settingsRoute.put(
    "/language-qualification/:id",
    authMiddleware([EDIT_QUALIFICATION]),
    updateLanguageQualificationController
);

settingsRoute.get(
    "/language-qualification/:id",
    authMiddleware([VIEW_QUALIFICATION]),
    getLanguageQualificationController
);

settingsRoute.post(
    "/language-qualifications",
    authMiddleware([VIEW_QUALIFICATION]),
    getAllLanguageQualificationController
);

settingsRoute.post(
    "/job-qualification",
    authMiddleware([CREATE_QUALIFICATION]),
    createJobQualificationController
);

settingsRoute.put(
    "/job-qualification/:id",
    authMiddleware([EDIT_QUALIFICATION]),
    updateJobQualificationController
);

settingsRoute.get(
    "/job-qualification/:id",
    authMiddleware([VIEW_QUALIFICATION]),
    getJobQualificationController
);

settingsRoute.post(
    "/job-qualifications",
    authMiddleware([VIEW_QUALIFICATION]),
    getAllJobQualificationController
);

export default settingsRoute;
