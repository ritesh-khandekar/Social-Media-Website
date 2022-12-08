import posts from '../models/posts.js'

export const likePost = async (req, res) => {
    const { postID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postID)) {
        return res.status(404).send('Post unavailable...');
    }
    try {
        const post = await posts.findById(postID)
        const likeIndex = post.likes.findIndex((likeID) => likeID == req.userId)
        if (likeIndex === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((likeID) => likeID !== req.userId)
        }
        await posts.findByIdAndUpdate(postID, post)
        res.status(200).json({ result: post })

    } catch (error) {
        res.status(500).json("Something went worng while changing likes for the post...")
    }
}
export const newPost = async (req, res) => {
    const { caption, data } = req.body;
    if (!data) {
        return res.status(400).json("No data found")
    }
    try {
        const post = await friends.create({ caption, data, by: req.userId })
        res.status(200).json({ result: post })

    } catch (error) {
        res.status(500).json("Something went worng...")
    }
}
export const deletePost = async (req, res) => {
    const { postID } = req.params;
    if (!postID) {
        return res.status(400).json("No Data Found")
    }
    if (!mongoose.Types.ObjectId.isValid(postID)) {
        return res.status(404).send('Post unavailable...');
    }
    try {
        await posts.findByIdAndDelete(postID)
        res.status(200).json({ deleted: true })
    } catch (error) {
        res.status(500).json("Something went worng...")
    }
}
export const getAllPosts = async (req, res) => {
    const { id: currentUser } = req.params;
    try {
        const allPosts = await posts.aggregate([
            { $match: { '_id': ObjectId(currentUser) } },
            {
                $lookup: {
                    from: 'fb_users',
                    localField: 'by',
                    foreignField: '_id',
                    as: 'userInfo'
                },
                $lookup: {
                    from: 'fb_users',
                    localField: 'by',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            }
        ]);
        const allPostsDetails = []
        allPosts.forEach(post => {
            allPostsDetails.push({
                _id: post._id,
                data: post.data,
                likes: post.likes,
                type: post.type,
                shares: post.shares,
                caption: post.caption,
                by: post.userInfo
            })
        })
        res.status(200).json(allPostsDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
