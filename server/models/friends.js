import mongoose from "mongoose";

const friendsSchema = mongoose.Schema({
    friend1: { type: String, required: true },
    friend2: { type: String, required: true },
    time: { type: Date, default: Date.now },
    accepted: { type: Boolean, default: false }
})

export default mongoose.model("fb_friends", friendsSchema)