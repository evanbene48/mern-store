import express from "express";
import {
  createUser, deleteUserById, getAllUsers, getCurrentUserProfile, getUserById, loginUser, logoutUser, updateCurrentUserProfile
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

router.route('/:id')
.get(authenticate,authorizeAdmin,getUserById)
.delete(authenticate, authorizeAdmin, deleteUserById)


export default router;