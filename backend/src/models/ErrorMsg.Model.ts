import mongoose from "mongoose";

export const ErrorMsg = mongoose.model("ErrorMsg", new mongoose.Schema({
    id:{type: String},
    errMsg:{type:Object},
    filePath:{type:String}
}))