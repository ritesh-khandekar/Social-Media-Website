import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
    by: { type: mongoose.Types.ObjectId, required: true },
    likes: { type: [mongoose.Types.ObjectId], required: true, default: [] },
    shares: { type: [mongoose.Types.ObjectId], required: true, default: [] },
    type: { type: String, required: true, default: 'tmp' },
    data: { type: String, required: true },
    caption: { type: String, default: '' },
    time: { type: Date, default: Date.now },
})

export default mongoose.model("fb_posts", postsSchema)