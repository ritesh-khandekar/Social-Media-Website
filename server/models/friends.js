import mongoose from "mongoose";

const friendsSchema = mongoose.Schema({
    friend1: { type: mongoose.Types.ObjectId, required: true },
    friend2: { type: mongoose.Types.ObjectId, required: true },
    time: { type: Date, default: Date.now },
})

export default mongoose.model("fb_friends", friendsSchema)