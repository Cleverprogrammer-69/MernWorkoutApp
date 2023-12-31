import express from "express";
import router from "./routes/WorkoutsRoute.js";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import cors from "cors"
import http from "http"
import cookieParser from "cookie-parser";
const app=express()
const PORT=3002
const MONGO_URL=`mongodb+srv://abdullah:KS9uoq3aIfwndxjG@mernworkoutapp.pu1fuzq.mongodb.net/?retryWrites=true&w=majority`
app.use(express.json())
app.use(cors(
    {
        origin: ["https://mern-workout-frontend.vercel.app"],
        methods: ["POST", "GET", "PATCH", "DELETE"],
        credentials: true
    }
));
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
mongoose.connect(MONGO_URL)
app.use("/api/workouts",router)
app.listen(PORT,()=>{
    console.log("Server is Running")
})


