import express from "express";
import {
  createUser, getAllUsers, loginUser, logoutUser
} from "../controllers/user.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//create user
router.post("/createUser", createUser)
//login
router.post("/loginUser", loginUser)
//log out
router.post("/logout", logoutUser)
//get all user
router.get("/getAllUsers", authenticate, authorizeAdmin, getAllUsers)

export default router;