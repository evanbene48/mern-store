import express from "express";
import {
  register, deleteUserById, getAllUsers, 
  getCurrentUserProfile, getUserById, 
  logout, updateCurrentUserProfile, updateUserById, login
} from "../controllers/user.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// /api/users

//create user
router.post("/register", register)
//login
router.post("/login", login)
//log out
router.post("/logout", logout)
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
.put(authenticate, authorizeAdmin, updateUserById)


export default router;