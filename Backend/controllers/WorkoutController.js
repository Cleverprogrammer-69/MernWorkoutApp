import Workout from "../models/WorkoutModel.js";
import mongoose from "mongoose";
//GET all workouts

export const getAllWorkouts= async (req,res)=>{
    
    try {
        const workouts=await Workout.find({}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
//GET one workout
 
export const getOneWorkout = async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: "No such workout"})

   
    try {
         const workout= await Workout.findById(id)
        if(!workout){
        return  res.status(404).json({error: "No such workout"})
    }
    return res.status(200).json(workout)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
    
    
}
//POST one workout

export const createWorkout= async (req,res)=>{
    const {title,reps,load}=req.body
    try {
        const workout=await Workout.create({title,reps,load})
        res.status(200).json(workout)
    } catch (error) {
       res.status(400).json({error: error.message})
    }
}
//DELETE one workout

export const deleteWorkout = async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: "No such workout"})
    try {
        const workout=await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return  res.status(404).json({error: "No such workout"})
    }
    return res.status(200).json(workout)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}
//UPDATE one workout

export const updateWorkout = async (req,res) => {
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: "No such workout"})
    try {
        const workout=await Workout.findOneAndUpdate({_id: id},{
            ...req.body
        })
    if(!workout){
        return  res.status(404).json({error: "No such workout"})
    }
    return res.status(200).json(workout)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}