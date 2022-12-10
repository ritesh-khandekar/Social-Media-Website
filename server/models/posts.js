import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
    by: { type: String, required: true },
    likes: { type: [String], required: true, default: [] },
    shares: { type: [String], required: true, default: [] },
    type: { type: String, required: true, default: 'tmp' },
    data: { type: String, required: true },
    caption: { type: String, default: '' },
    time: { type: Date, default: Date.now },
})

export default mongoose.model("fb_posts", postsSchema)