import mongoose from 'mongoose';
import {config} from './config.js'

export const connectDb = async () => { 
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("Mongodb connected successfully");
    }
    catch (error) {
        console.log("Error while connecting mongoDb!", error.message);
    }
}
