import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config()
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import userAuthRouter from "./routes/userAuthRouter.js";
import userDetailRouter from "./routes/userDetailRouter.js";

const app = express()

app.use(cors({
    origin: process.env.FORNTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json("Hello")
});

// API endpoints
app.use("/api", userAuthRouter)
app.use("/api", userDetailRouter)

const PORT = process.env.PORT
app.listen( PORT, () => {
    console.log(`app is listening om PORT ${PORT}`);
    connectDB()
})