import { v4 as uuidv4 } from "uuid";
import { storage } from "../config/firebaseConfig";

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
