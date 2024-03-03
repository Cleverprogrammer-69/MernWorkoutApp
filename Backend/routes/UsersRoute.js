import express from 'express'
import {signupUser,loginUser} from '../controllers/UserController.js'
const router=express.Router()

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

export default router