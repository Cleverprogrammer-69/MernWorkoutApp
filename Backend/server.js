import express from "express";
import WorkoutsRoute from "./routes/WorkoutsRoute.js";
import UsersRoute from "./routes/UsersRoute.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));

// MongoDB connection logic
const uri = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000, // Connection timeout in milliseconds
  socketTimeoutMS: 45000, // Socket timeout in milliseconds (optional)
  // ... other options if needed
};

mongoose
  .connect(uri, options)
  .then(() => {
    console.log("MongoDB connected successfully");

    // Mount routes after successful connection
    app.use("/api/workouts", WorkoutsRoute);
    app.use("/api/user", UsersRoute);

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Terminate server on connection failure
  });

// Middleware for logging requests (optional)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
