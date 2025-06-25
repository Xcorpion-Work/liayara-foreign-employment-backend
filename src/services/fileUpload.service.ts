import { v4 as uuidv4 } from "uuid";
import { storage } from "../config/firebaseConfig";
import {
    findOnePassengerDocumentMappingRepo,
    updatePassengerDocumentMappingRepo,
} from "../repositories/PassengerMappings.repository";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const uploadDocuments = async (
    file: Express.Multer.File,
    type: "foreign-agent" | "sub-agent" | "passenger" | "local-agent",
    relatedId: string
): Promise<string> => {
    try {
        const env = process.env.NODE_ENV ?? "dev";
        const uniqueFileName = `${uuidv4()}-${file.originalname}`;
        const filePath = `lfe/${env}/${type}/${relatedId}/${uniqueFileName}`;

        const fileUpload = storage.file(filePath);
        await fileUpload.save(file.buffer, {
            metadata: {
                contentType: file.mimetype,
            },
            public: true, // optional: make it publicly accessible
        });

        // Return public URL
        return `https://storage.googleapis.com/${storage.name}/${filePath}`;
    } catch (e) {
        console.error("Upload error:", e);
        throw e;
    }
};

export const uploadPassengerDocumentService = async (
    file: Express.Multer.File,
    type: "foreign-agent" | "sub-agent" | "passenger" | "local-agent",
    relatedId: string,
    documentTypeId: string,
    user: any
) => {
    try {
        console.log("documentTypeId", documentTypeId);
        const env = process.env.NODE_ENV ?? "dev";
        const uniqueFileName = `${uuidv4()}-${file.originalname}`;
        const filePath = `lfe/${env}/${type}/${relatedId}/${uniqueFileName}`;

        const fileUpload = storage.file(filePath);
        await fileUpload.save(file.buffer, {
            metadata: {
                contentType: file.mimetype,
            },
            public: true,
        });

        const name = file.originalname;
        const path = `https://storage.googleapis.com/${storage.name}/${filePath}`;
        const uploadedBy = user._id;

        const documentMapping: any = await findOnePassengerDocumentMappingRepo({
            passengerId: new ObjectId(relatedId),
        });

        if (!documentMapping) {
            throw new Error("Document mapping not found");
        }

        documentMapping.documents = documentMapping.documents.map((doc: any) =>
            doc.documentTypeId.toString() === documentTypeId
                ? {
                      ...doc,
                      name,
                      path,
                      uploadedBy,
                      isVerified: false,
                      isRejected: false,
                      reason: null,
                  }
                : doc
        );
        documentMapping.mappingStatus = "PENDING";

        await updatePassengerDocumentMappingRepo(
            { _id: documentMapping._id },
            documentMapping
        );

        return { name, path };
    } catch (e) {
        console.error("Upload error:", e);
        throw e;
    }
};
