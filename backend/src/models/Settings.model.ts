import mongoose from "mongoose";

const FinalContactsMongooseSchema = new mongoose.Schema({
    emailIDs: {
      primary: { type: String, default: "" },
      secondary: { type: String, default: "" },
      tertiary: { type: String, default: "" },
    },
    phoneNums: {
      primary: { type: String, default: "" },
      secondary: { type: String, default: "" },
      tertiary: { type: String, default: "" },
    }
  });
  
  export const Settings = mongoose.model("Settings", new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String, default: ""},
    alertPause: { type: Boolean, default: false },
    alertPauseOnPhoneCall: { type: Boolean, default: false },
    lastRecharge: { type: Date, default: new Date(0) },
    contactInfo: FinalContactsMongooseSchema,
  }));
  