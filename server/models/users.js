import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    birthdate: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, select: false },
    posts: { type: Number, default: 0 },
    time: { type: Date, default: Date.now },
    bio: { type: String, default: '' },
    sentFriendRequests: { type: [String], default: [], select: false },
    receivedFriendRequests: { type: [String], default: [], select: false },
    friends: { type: [String], default: [] },
    profile: { type: String, default: '' },
})

export default mongoose.model("fb_users", userSchema)