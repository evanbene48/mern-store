//PACKAGES
import path from "path";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

//UTILES
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";



dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

//The express. json() function is a middleware function used in Epress. js 
//applications to parse incoming JSON data from HTTP requests
//ini wajib ada karena kalau gk ada express gk bisa baca inputan json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);


app.get("/", (req,res) =>{
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
    