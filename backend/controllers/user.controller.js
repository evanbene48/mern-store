//package untuk model
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js"

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }
  
  const userExists = await User.findOne({ email });
  if (userExists){
    res.status(400).json({message : "User already exists"});
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

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    //find the user with email
    const existingUser = await User.findOne({ email });

    if(!existingUser){
      res.status(404).json({message : "User not found"});
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      res.status(401).json({message : "Wrong password"});
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

export const logout = asyncHandler(async(req,res) =>{

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

export const getCurrentUserProfile = asyncHandler(async (req, res) => {
  console.log("get current user profile")
  try {
    const user = await User.findById(req.user._id);
    if(!user){
      res.status(404).json({message : "User not found."});
      return;
    }
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

  } catch (error) {
    throw new Error(`${error.message}`);
  }

});

export const updateCurrentUserProfile = asyncHandler(async(req,res,next)=>{
  // req.user ini udh dapet data di authenticate middleware
  const {username, email, password} = req.body;

  if(!username && !email && !password){
    res.status(400).json({message : "Please update at least one"});
    return;
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404).json({message : "User not found"});
    return;
  }

  //dibawah ini sama kyak
  // if(username != null)
  // user-username = username
  //else
  // user.username = user.username
  user.username = username || user.username;
  user.email = email || user.email;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
  }

  try {
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      // isAdmin: updatedUser.isAdmin,
    });    
  } catch (error) {
    throw new Error(`${error.message}`);
  }
})

export const deleteUserById = asyncHandler(async(req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);

    console.log(user)
    if(!user){
      res.status(404).json({message : "User not found"});
      return;
    }
  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }

  if(user.isAdmin){
    throw new Error("Cannot delete admin user");
  }

  try {
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
})

export const getUserById = asyncHandler(async(req,res,next)=>{
  
  try {
    const user = await User.findById(req.params.id).select("-password");

    if(!user){
      res.status(404).json({message : "User not found"});
      return;
    }
  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
  
  res.json(user);
  
})

export const updateUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if(!user){
      res.status(404).json({message : "User not found"});
      return;
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });

  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }

  
});