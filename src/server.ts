import express, { Request, Response } from "express";
import dotenv from "dotenv";
import * as path from "node:path";
import http from "http";
import { Server } from "socket.io";
import packageInfo from "../package.json";
import cors from "cors";
import startup from "./utils/startup";
import { getLocalIPAddress } from "./utils/localIpAddress";
import connectDB from "./repository";
import routes from "./router";

// Load the correct environment file BEFORE anything else
const env = process.env.NODE_ENV ?? "dev";
dotenv.config({ path: path.resolve(__dirname, `../config/${env}.env`) });

console.log(startup());

// Connect to the database
connectDB();

const localIP = getLocalIPAddress();
const port = process.env.PORT ?? 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main route
app.get("/", (req: Request, res: Response) => {
    res.send(`${packageInfo.name} server (${process.env.NODE_ENV}) v${packageInfo.version} running`);
});

app.use("/api/v1", routes);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration if needed
const io = new Server(server, {
    cors: { origin: "*" },
});

// Listen for client connections
io.on("connection", (socket: any) => {
    console.log("A user connected:", socket.id);

    socket.on("message", (data: any) => {
        console.log("Message received:", data);
        socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start the server
server.listen(port, () => {
    console.log(
        `${packageInfo.name} server v${packageInfo.version} is running:`
    );
    console.log(`- Local:    http://localhost:${port}`);
    console.log(`- Network:  http://${localIP}:${port}`);
});
