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
import axios from 'axios'
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);


//Config env file from root
dotenv.config();
const PORT = process.env.PORT;

//connect and config Database
connectDB();




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



app.use(express.json());
app.use(cors({ origin: true }));



const CHAT_ENGINE_PROJECT_ID = "bd1f1f27-a91a-4da0-8768-8ff427381ab7";
const CHAT_ENGINE_PRIVATE_KEY = "bd1f1f27-a91a-4da0-8768-8ff427381ab7";

app.post("/signup", async (req, res) => {
    const { username, secret, email, first_name, last_name } = req.body;

    // Store a user-copy on Chat Engine!
    // Docs at rest.chatengine.io
    try {
        const r = await axios.post(
            "https://api.chatengine.io/users/",
            { username, secret, email, first_name, last_name },
            { headers: { "Private-Key": CHAT_ENGINE_PRIVATE_KEY } }
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
    }
});

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { folder } = req.params;
        const uploadPath = path.join(__dirname, 'public', folder);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Define route for file upload
app.post('/api/upload/:folder', upload.single('file'), (req, res) => {
    res.json({ message: `File uploaded to /public/${req.params.folder}/${req.file.originalname}` });
});


app.post("/login", async (req, res) => {
    const { username, secret } = req.body;

    // Fetch this user from Chat Engine in this project!
    // Docs at rest.chatengine.io
    try {
        const r = await axios.get("https://api.chatengine.io/users/me/", {
            headers: {
                "Project-ID": CHAT_ENGINE_PROJECT_ID,
                "User-Name": username,
                "User-Secret": secret,
            },
        });
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
    }
});





app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`.bgGreen.black)
})