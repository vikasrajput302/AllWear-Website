import express from "express";
import cors from "cors";
import 'dotenv/config';

const app = express();


///middlewares--
app.use(cors());
app.use(express.json());

//api endpoints
app.get("/",(req,res)=>{
    res.send("Api is working")
})

export default app;
