import { Router } from "express";
import multer from "multer";
import {
    fileUploadController,
    passengerDocumentFileUploadController,
} from "../controllers/fileUpload.controller";
import authMiddleware from "../middlewares/auth.middleware";

const upload = multer({ storage: multer.memoryStorage() }); // or your config

const fileUploadRoute = Router();

fileUploadRoute.post(
    "/file-upload",
    authMiddleware(),
    upload.single("file"),
    fileUploadController
);
fileUploadRoute.post(
    "/passenger-document-file-upload",
    authMiddleware(),
    upload.single("file"),
    passengerDocumentFileUploadController
);

export default fileUploadRoute;
