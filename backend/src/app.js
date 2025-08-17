import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRoute from "../src/routes/user.route.js"
import blogRoute from "../src/routes/blog.route.js"
import commentRoute from "../src/routes/comment.route.js"

dotenv.config()
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use("/api/v1/auth", userRoute)
app.use("/api/v1/blog", blogRoute)
app.use("/api/v1/comment", commentRoute)

export { app };