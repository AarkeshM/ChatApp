import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";  

dotenv.config({}); 
 

const app = express(); 

const PORT = process.env.PORT || 5000;
 
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());   
 
   
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});    
 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message",messageRoute);

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`); 
});  