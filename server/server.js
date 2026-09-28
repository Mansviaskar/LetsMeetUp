import express, { response } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import { handleClerkWebhook } from "./controllers/webhookController.js";
import meetingRouter from "./routes/meetingRoutes.js";

//express instance
const app = express();

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

//port no
const port = process.env.PORT || 3000;

//start the server
app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})