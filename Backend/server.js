import express from "express";
import router from "./routes/WorkoutsRoute.js";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import cors from "cors"
dotenv.config()
const app=express()
const PORT=process.env.PORT || 3001
const MONGO_URL= process.env.MONGODB_URI || `mongodb+srv://abdullah:KS9uoq3aIfwndxjG@mernworkoutapp.pu1fuzq.mongodb.net/?retryWrites=true&w=majority`
app.use(express.json())
app.use(cors('*'));


app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use("/api/workouts",router)

const connectToMongoDb=async(MONGO_URL)=>{
    try {
        await mongoose.connect(MONGO_URL)
        app.listen(PORT,()=>{
        console.log("Mongo db is connected & Server is up on "+PORT)
})
    } catch (error) {
        console.log(error)
    }
}
connectToMongoDb(MONGO_URL)
