import express from "express";
import cors from "cors";
import 'dotenv/config';
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";


const app = express();


///middlewares--
app.use(cors());
app.use(express.json());

//api endpoints
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);


app.get("/",(req,res)=>{
    res.send("Api is working");
})

export default app;
