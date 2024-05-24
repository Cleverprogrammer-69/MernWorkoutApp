import express from "express";
import { createWorkout,getAllWorkouts,getOneWorkout,deleteWorkout,updateWorkout } from "../controllers/WorkoutController.js";
import requireAuth from "../middlewares/requireAuth.js";
const router=express.Router()
//require Auth for all workout routes
router.use(requireAuth);
router.get("/",getAllWorkouts)

router.get("/:id",getOneWorkout)

router.post("/",createWorkout)

router.delete("/:id",deleteWorkout)

router.patch("/:id",updateWorkout)
export default router