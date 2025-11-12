import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"; 

dotenv.config({});

const app = express();
const port = process.env.PORT || 3000;

app.get("/home",(req,res)=> {
    return res.status(200).json({
        message:"I'm coming from backend",
        success:true
    })
})

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));


//apis
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
// "http://localhost:8000/api/v1/user/register"


app.listen(port,()=> {
    connectDB(); // to connect the db
    console.log(`Server running at port ${port}`);
    
})