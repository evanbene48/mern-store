//package untuk model
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js"

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }
  
  const userExists = await User.findOne({ email });
  if (userExists){
    res.status(400).send("User already exists");
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
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find()
      // .sort({ createdAt: sortDirection })
      // .skip(startIndex)
      // .limit(limit);

    res.status(200).json({
      users
    })
  } catch (error) {
    res.status(400);
    throw new Error(`${error.message}`);
  }

  
})


export {
    createUser,
    getUsers
  };