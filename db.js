import mongoose from "mongoose";

export function connectDb () {
    console.log(process.env.host_db)
    return mongoose.connect(process.env.host_db)
}