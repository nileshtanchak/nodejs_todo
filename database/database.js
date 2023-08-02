import mongoose from "mongoose";
import env from "dotenv";
env.config({
    path: "./config/config.env"
})

export const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log("db connected");
    }).catch ((e) => {
        console.log(e);
    });
} 
