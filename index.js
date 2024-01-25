import express from "express";
// OR const express =require('express')
import dotenv from 'dotenv';
import connectDB from "./db.js";
import morgan from "morgan";
import authRoutes from './Routes/authRoute.js';
import forumRoutes from './Routes/forumRoute.js';
import teamRoutes from './Routes/teamRoutes.js';
import workroutes from './Routes/WorkRoute.js';
import cors from 'cors';


//Config env file from root
dotenv.config();
const PORT = process.env.PORT;

//connect and config Database
connectDB();


//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes 
app.use("/auth", authRoutes);
app.use("/forum", forumRoutes);
app.use("/team", teamRoutes);
app.use("/work", workroutes);

app.get('/', (req, res) => {
    res.send("Server Running...")
})

//index file --> Routes (middlewares) --> Controllers--> Models and Helpers

app.use(cors({ origin: true }));



app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`.bgGreen.black)
})