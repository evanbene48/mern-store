import express from "express";
import {
  createUser, getUsers, loginUser
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/createUser", createUser)
router.post("/loginUser", loginUser)
router.get("/getUsers", getUsers)

export default router;