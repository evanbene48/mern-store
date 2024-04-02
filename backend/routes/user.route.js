import express from "express";
import {
  createUser, getAllUsers, getCurrentUserProfile, loginUser, logoutUser, updateCurrentUserProfile
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
// get user profile
// router.get("/profile", authenticate, getCurrentUserProfile)
router.route("/profile")
.get(authenticate, getCurrentUserProfile)
.put(authenticate, updateCurrentUserProfile)

export default router;