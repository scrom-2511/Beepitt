import mongoose from "mongoose";

export const Otp = mongoose.model("Otp", new mongoose.Schema({
    email : { type: String },
    otp : { type: String }
}))