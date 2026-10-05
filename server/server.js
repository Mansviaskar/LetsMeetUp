import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import { initDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { handleClerkWebhook } from "./controllers/webhookController.js";
import meetingRouter from "./routes/meetingRoutes.js";
import { Server } from "socket.io";
import { setupSocketIO } from "./socket.js";

// Express instance
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Connect to Neon & initialize tables
await initDB();

// Allowed frontend origins
const allowedOrigins = process.env.ORIGINS
    .split(",")
    .map(origin => origin.trim());

console.log("Allowed Origins:", allowedOrigins);

// CORS
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Cookie parser
app.use(cookieParser());

// Clerk webhook
app.post(
    "/api/clerk",
    express.raw({ type: "application/json" }),
    handleClerkWebhook
);

// JSON parser
app.use(express.json());

// Clerk middleware
app.use(clerkMiddleware());

// Test route
app.get("/", (req, res) => {
    res.send("API is Live!");
});

// Meeting routes
app.use("/api/meetings", meetingRouter);

// Socket.IO
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});

setupSocketIO(io);

// Centralized error handler
app.use((err, _req, res, _next) => {
    console.error(`[Error] ${err.message}`);
    res.status(500).json({
        error: "Internal Server Error"
    });
});

// Port
const port = process.env.PORT || 3000;

// Start server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});