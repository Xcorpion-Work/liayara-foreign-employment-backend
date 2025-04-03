import express, { Request, Response } from "express";
import dotenv from "dotenv";
import * as path from "node:path";

// Load the correct environment file BEFORE anything else
const env = process.env.NODE_ENV ?? "dev";
dotenv.config({ path: path.resolve(__dirname, `../config/${env}.env`) });

import packageInfo from "../package.json"
import cors from "cors";
import startup from "./utils/startup";
import { getLocalIPAddress } from "./utils/localIpAddress";
import connectDB from "./repository";

// Run startup ASCII art
console.log(startup());

// Connect to the database
connectDB();

const localIP = getLocalIPAddress();

const port = process.env.port ?? 3000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main route
app.get("/", (req: Request, res: Response) => {
    res.send(`${packageInfo.name} server v${packageInfo.version} running`)
})

// Start the server
app.listen(port, () => {
    console.log(`${packageInfo.name} server v${packageInfo.version} is running:`);
    console.log(`- Local:    http://localhost:${port}`);
    console.log(`- Network:  http://${localIP}:${port}`);
});
