import mongoose from "mongoose";

export const User = mongoose.model("User", new mongoose.Schema(
    {
        username: { type: String },
        email: { type: String },
        password: { type: String },
    }
))