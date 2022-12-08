import friends from '../models/friends.js'
import users from '../models/users.js'
import { ObjectId } from 'mongoose';

export const addFriend = async (req, res) => {
    const { friend1, friend2 } = req.params;
    if (!friend1 || !friend2) {
        return res.status(400).json("No Data Found")
    }
    if (!mongoose.Types.ObjectId.isValid(friend1) || !mongoose.Types.ObjectId.isValid(friend2)) {
        return res.status(404).send('User unavailable...');
    }
    try {
        const newFriends = await friends.create({ friend1, friend2 })
        res.status(200).json({ result: newFriends })

    } catch (error) {
        res.status(500).json("Something went worng...")
    }
}
export const removeFriend = async (req, res) => {
    const { friend } = req.params;
    if (!friend) {
        return res.status(400).json("No Data Found")
    }
    if (!mongoose.Types.ObjectId.isValid(friend)) {
        return res.status(404).send('User unavailable...');
    }
    try {
        await friends.deleteOne({
            $or: [
                { 'friend1': friend },
                { 'friend2': friend }
            ]
        })
        res.status(200).json({ deleted: true })

    } catch (error) {
        res.status(500).json("Something went worng...")
    }
}
export const getAllFriends = async (req, res) => {
    const { id: currentUser } = req.params;
    try {
        const allFriends = await users.aggregate([
            { $match: { '_id': ObjectId(currentUser) } },
            {
                $lookup: {
                    from: 'fb_friends',
                    localField: '_id',
                    foreignField: 'friend1',
                    as: 'friendInfo'
                },
                $lookup: {
                    from: 'fb_friends',
                    localField: '_id',
                    foreignField: 'friend2',
                    as: 'friendInfo'
                }
            }
        ]);
        const allFriendsDetails = []
        allFriends.forEach(user => {
            allFriendsDetails.push({
                _id: user._id,
                fname: user.fname,
                lname: user.lname,
                posts: user.posts,
                time: user.time,
                bio: user.bio,
                profile: user.profile,
            })
        })
        res.status(200).json(allFriendsDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
