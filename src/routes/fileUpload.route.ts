import { Router } from "express";
import multer from "multer";
import { fileUploadController } from "../controllers/fileUpload.controller";

const upload = multer({ storage: multer.memoryStorage() }); // or your config

const fileUploadRoute = Router();

fileUploadRoute.post("/file", upload.single("file"), fileUploadController);

export default fileUploadRoute;
