import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv"
dotenv.config()


async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("mongoDB connected")
        
        const connection = mongoose.connection
        connection.on("connected", () => {
        })

        connection.on("error", (error) => {
            console.log("mongoDB is not connceted", error)
        })
    } catch (error) {
        console.log("mongoDB is not connected", error)
    }
};

export default connectDB;