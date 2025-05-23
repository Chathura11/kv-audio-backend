import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRoute.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import reviewRouter from './routes/reviewRoute.js';
import inquiryRouter from './routes/inquiryRoute.js';
import cors from 'cors'
import orderRouter from './routes/orderRoute.js';


dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token = req.header("Authorization");
    if(token != null){
        token = token.replace("Bearer ","");

        jwt.verify(token,process.env.JWT_SECRET_KEY,
        (err,decoded)=>{
            if(!err){
                req.user = decoded;
                
            }
        }
    )
    }
    next();
})

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("MongoDB connection established successfully!");
})

app.use('/api/students',studentRouter);
app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/reviews',reviewRouter);
app.use('/api/inquiries',inquiryRouter);
app.use('/api/orders',orderRouter);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})