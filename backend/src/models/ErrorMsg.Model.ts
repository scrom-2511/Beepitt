import mongoose from "mongoose";

export const errMsgObjSchema = new mongoose.Schema({
    errName: { type: String },
    errMsg: { type: String },
    errStack: { type: String }
})

export const ErrorMsg = mongoose.model("ErrorMsg", new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    errMsgObj: { type: errMsgObjSchema },
    filePath: { type: String },
    solved: { type: Boolean },
    aiRecommendation: { type: String }
}, { timestamps: true }))