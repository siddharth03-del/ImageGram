import mongoose from "mongoose";
import { DB_URL } from "./server_config.js";
export async function connectDB(){
    try{
        await mongoose.connect(DB_URL)
        console.log('Connect to database')
    }
    catch(error){
        console.log("An unexpected error occured");
        console.log(error);
    }
}