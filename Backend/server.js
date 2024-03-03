import express from "express";
import WorkoutsRoute from "./routes/WorkoutsRoute.js";
import UsersRoute from './routes/UsersRoute.js'
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
const app = express();
const PORT = process.env.PORT || 3002;
dotenv.config()
app.use(express.json());
app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/workouts", WorkoutsRoute);
app.use("/api/user",UsersRoute)
mongoose.connect(process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log("Server is Running");
});
