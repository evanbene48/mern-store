//package untuk model
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js"

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }
  
  const userExists = await User.findOne({ email });
  if (userExists){
    res.status(400).json("User already exists");
    return;
  } 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    
    throw new Error("Invalid user data");
  }
});

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({})
      // .sort({ createdAt: sortDirection })
      // .skip(startIndex)
      // .limit(limit);

    res.status(200).json({
      users
    })
  } catch (error) {
    
    throw new Error(`${error.message}`);
  }

  
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    //find the user with email
    const existingUser = await User.findOne({ email });

    if(!existingUser){
      res.status(404).json("User not found");
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      res.status(401).json("Wrong password");
      return;
    }

    createToken(res, existingUser._id);

    res.status(200).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    })
  } catch (error) {
    throw new Error(`${error.message}`);
  }
  
  
});


export const logoutUser = asyncHandler(async(req,res) =>{

  try {
    res
    .clearCookie('jwt')
    .status(200)
    .json('User has been signed out');

    // res.cookie("jwt", "", {
    //   httyOnly: true,
    //   expires: new Date(0),
    // });

    // res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    throw new Error(`${error.message}`);
  }
})