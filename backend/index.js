//PACKAGES
import path from "path";
import express from "express";
import dotenv from "dotenv";

//UTILES
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";



dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req,res) =>{
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
    