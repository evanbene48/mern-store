import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;
  
  if (!token) {
    res.status(401).json({message : "Not authorized, token failed."});
    return;
  }

  try {
    console.log('authenticate try')
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
      res.status(404).json({message : "User not found."});
      return;
    }
    req.user = user
    console.log(req.user)
    //next untuk ke function selanjutnya
    // kalau gk dikasih next, function selanjutnya ga jalan
    next();
  } catch (error) {
    throw new Error(`Not authorized, error : ${error.message}`);
  }

});

export const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({message : "Not authorized as an admin."});
      return;
    }
  };