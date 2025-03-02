import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config()
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import userAuthRouter from "./routes/userAuthRouter.js";
import userDetailRouter from "./routes/userDetailRouter.js";
import userSearchRouter from "./routes/userSearchRouter.js";

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    // origin: process.env.FORNTEND_URL,
    origin: true,
    credentials: true
}))

app.get('/', (req, res) => {
    res.json("Hello")
});

// API endpoints
app.use("/api", userAuthRouter)
app.use("/api", userDetailRouter)
app.use("/api", userSearchRouter)

const PORT = process.env.PORT
app.listen( PORT, () => {
    console.log(`app is listening om PORT ${PORT}`);
    console.log(process.env.FORNTEND_URL)
    connectDB()
})