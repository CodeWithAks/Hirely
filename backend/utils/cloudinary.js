import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

console.log("CLOUD:", process.env.CLOUD_NAME); //nothingprinting
console.log("TEST:", process.env.MONGO_URI);


export default cloudinary;

