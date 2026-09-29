import express, { response } from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import { initDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import { handleClerkWebhook } from "./controllers/webhookController.js";
import meetingRouter from "./routes/meetingRoutes.js";
import { Server } from "socket.io";
import { setupSocketIO } from "./socket.js";

//express instance
const app = express();

//create server
const server = http.createServer(app);

// connect to neon & initialize tables
await initDB()

const allowedOrigins = process.env.ORIGINS.split(",")

app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(cookieParser());

//Test route
app.post("/api/clerk", express.raw({type: "application/json"}), handleClerkWebhook);

app.use(express.json())
app.use(clerkMiddleware())


//first route
app.get("/", (req, res)=> {res.send("API is Live!");});

//another route
app.use("/api/meetings", meetingRouter)


const io = new Server(server, {
    cors: {origin: allowedOrigins, credentials: true}
})

setupSocketIO(io)

//centralized error handler
app.use((err, _req, res, _next)=>{
    console.error(`[Error] ${err.message}`);
    res.status(500).json({error: "Interenal Server Error"});
})

//port no
const port = process.env.PORT || 3000;

//start the server
server.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})