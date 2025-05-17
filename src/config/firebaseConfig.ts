// src/config/firebaseConfig.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import * as path from "path";

const serviceAccountPath = path.resolve(
    __dirname,
    "../../firebase-service-account.json"
);

if (!getApps().length) {
    initializeApp({
        credential: cert(serviceAccountPath),
        storageBucket: "wijekoon-distributors.appspot.com",
    });
}

const storage = getStorage().bucket();

export { storage };
