import express from "express";
import { createWorkout,getAllWorkouts,getOneWorkout,deleteWorkout,updateWorkout } from "../controllers/WorkoutController.js";
const router=express.Router()

router.get("/",getAllWorkouts)

router.get("/:id",getOneWorkout)

router.post("/",createWorkout)

router.delete("/:id",deleteWorkout)

router.patch("/:id",updateWorkout)
export default router