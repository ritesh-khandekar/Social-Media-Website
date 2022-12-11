import mongoose from 'mongoose';
import posts from '../models/posts.js'
import users from '../models/users.js'

export const likePost = async (req, res) => {
    const { postID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postID)) {
        return res.status(404).send('Post unavailable...');
    }
    try {
        const post = await posts.findById(postID)
        let newpost = JSON.parse(JSON.stringify(post))

        const likeIndex = newpost.likes.findIndex((likeID) => likeID == req.userId)
        if (likeIndex === -1) {
            newpost.likes.push(req.userId)
        } else {
            newpost.likes = newpost.likes.filter((likeID) => likeID != req.userId)
        }
        newpost = await posts.findByIdAndUpdate(postID, newpost, { new: true })
        res.status(200).json({ result: newpost })

    } catch (error) {
        res.status(500).json("Something went worng while changing likes for the post...")
    }
}
export const newPost = async (req, res) => {
    const { caption, data, type } = req.body;
    if (!data) {
        return res.status(400).json("No data found")
    }
    const userPosted = await users.findById(req.userId)
    try {
        userPosted.posts += 1
        const post = await posts.create({ caption, data, type, by: req.userId })
        await users.findByIdAndUpdate(req.userId, userPosted)
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

export const getFeedPosts = async (req, res) => {
    const currentUser = req.userId;
    try {
        const allUsers = await users.find({
            friends: currentUser
        })
        const friends = allUsers.map(user => user._id)
        let feedPosts = await posts.find({
            by: {
                $in: friends
            }
        })
        // const allPostsDetails = []
        // allUsers.forEach(user => {
        //     allPostsDetails.push({
        //         _id: user.postInfo._id,
        //         data: user.postInfo.data,
        //         likes: user.postInfo.likes,
        //         type: user.postInfo.type,
        //         shares: user.postInfo.shares,
        //         caption: user.postInfo.caption,
        //         by: user.postInfo.userInfo
        //     })
        // })
        feedPosts = feedPosts.map(post => {
            const userPosted = allUsers.filter(user => user._id == post.by)[0]
            post = JSON.parse(JSON.stringify(post))
            return { ...post, 'fname': userPosted.fname, 'lname': userPosted.lname, 'profile': userPosted.profile }
        })
        res.status(200).json({ feedPosts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getAllPosts = async (req, res) => {
    const { id: currentUser } = req.params;
    try {
        const allPosts = await posts.aggregate([
            { $match: { '_id': currentUser } },
            {
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
