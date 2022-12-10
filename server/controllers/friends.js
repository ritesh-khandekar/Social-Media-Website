import mongoose from 'mongoose';
import friends from '../models/friends.js'
import users from '../models/users.js'

export const addFriend = async (req, res) => {
    const { friend } = req.params;
    const user = req.userId

    if (!user || !friend) {
        return res.status(400).json("No Data Found")
    }
    if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(friend)) {
        return res.status(404).send('User unavailable...');
    }

    const thisUser = await users.findById(user)
    const friendUser = await users.findById(friend)

    console.log(thisUser)
    if (thisUser.sentFriendRequests.includes(friend)) {
        return res.status(404).send('Friend request already sent...');
    }

    thisUser.sentFriendRequests.push(friend)
    friendUser.receivedFriendRequests.push(user)
    try {
        const friendRequests = thisUser.sentFriendRequests;
        const updatedUser = await users.findByIdAndUpdate(user, {
            sentFriendRequests: friendRequests
        }, { new: true })
        const updatedFriend = await users.findByIdAndUpdate(friend, {
            receivedFriendRequests: friendUser.receivedFriendRequests
        }, { new: true })
        res.status(200).json({ updatedUser, updatedFriend })
    } catch (error) {
        res.status(500).json("Something went wrong..." + error)
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
    const thisUser = await users.findById(req.userId)
    const friendUser = await users.findById(friend)
    if (!thisUser.friends.includes(friend)) {
        
        console.log(thisUser)
        if(thisUser.sentFriendRequests.includes(friend)){
            await users.findByIdAndUpdate(req.userId,{
                sentFriendRequests: thisUser.sentFriendRequests.filter(fr => fr !== friend)
            })
            await users.findByIdAndUpdate(friend,{
                receivedFriendRequests: thisUser.receivedFriendRequests.filter(fr => fr !== req.userId)
            })
            return res.status(201).send('Removed friend request...');
        }
        return res.status(401).send('No friend...');
    }

    const thisUpdatedFriends = thisUser.friends.filter(f => f !== friend)
    const friendUpdatedFriends = friendUser.friends.filter(f => f !== req.userId)
    try {
        await users.findByIdAndUpdate(req.userId, {
            friends: thisUpdatedFriends
        })
        await users.findByIdAndUpdate(friend, {
            friends: friendUpdatedFriends
        })
        res.status(200).json({ deleted: true })

    } catch (error) {
        res.status(500).json("Something went worng...")
    }
}
export const acceptFriend = async (req, res) => {
    const { friend } = req.params;
    const user = req.userId
    if (!friend) {
        return res.status(400).json("No Data Found")
    }
    if (!mongoose.Types.ObjectId.isValid(friend)) {
        return res.status(404).send('User unavailable...');
    }
    const thisUser = await users.findById(user)
    const friendUser = await users.findById(friend)
    if (!thisUser.receivedFriendRequests.includes(friend)) {
        return res.status(404).send('No request...');
    }

    const updatedSentRequests = friendUser.sentFriendRequests.filter(f => f !== user)
    const updatedFriendRequests = thisUser.receivedFriendRequests.filter(f => f !== friend)
    thisUser.friends.push(friend)
    friendUser.friends.push(user)
    try {
        await users.findByIdAndUpdate(req.userId, {
            receivedFriendRequests: updatedFriendRequests,
            friends: thisUser.friends
        })
        await users.findByIdAndUpdate(friend, {
            sentFriendRequests: updatedSentRequests,
            friends: friendUser.friends
        })
        res.status(200).json({ thisUser })

    } catch (error) {
        res.status(500).json("Something went worng...")
    }
}
export const getSuggestions2 = async (req, res) => {
    try {
        let friends = await users.find({
            friends: { $ne: req.userId },
            receivedFriendRequests: { $ne: req.userId }
        })
        friends = friends.filter(friend => friend._id != req.userId)
        return res.status(200).send({ friends })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "problem while getting friend suggestions" })
    }
}
export const getSuggestions = async (req, res) => {
    try {
        let friendSuggestions = await friends.aggregate([
            { $match: { 'friend1': { $ne: '639422da1822fe0591322768' } } },
            { $match: { 'friend2': { $ne: '639422da1822fe0591322768' } } },
            // { $group: { _id: { 'friend1': '$friend1', 'friend2': '$friend2' }, total: { $sum: 1 } } },
            {
                $lookup: {
                    from: 'fb_users',
                    pipeline: [{
                        $match: {
                            $expr: {
                                $or: [
                                    { 'friend1': '$friend1' },
                                    { 'friend2': '$friend2' },
                                    { 'friend2': '$friend1' },
                                    { 'friend1': '$friend2' }
                                ]
                            }
                        }
                    }],
                    as: 'friendData'
                }
            }
        ])
        // friendSuggestions = friendSuggestions.filter(friend => friend._id !== req.userId)
        return res.status(200).send({ suggestions: friendSuggestions })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "problem while getting friend suggestions" })
    }
}
export const getSentRequests = async (req, res) => {
    try {
        let sentRequests = await users.find({
            receivedFriendRequests: req.userId
        })
        return res.status(200).send({ sentRequests })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "problem while getting sent friend requests" })
    }
}
export const getAllFriends = async (req, res) => {
    const { id: currentUser } = req.params;
    try {
        let friends = await users.find({
            friends: currentUser,
        })
        friends = friends.filter(friend => friend._id != req.userId)
        return res.status(200).send({ friends })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "problem while getting friend suggestions" })
    }
}
export const getAllFriendRequests = async (req, res) => {
    const currentUser = req.userId;
    // console.log(currentUser)
    try {
        const receivedRequests = await users.find({
            sentFriendRequests: currentUser
        })
        // console.log(thisUser)
        // const receivedFriendRequests = thisUser.receivedFriendRequests
        // const receivedRequests = receivedFriendRequests.map(async fr => {
        //     console.log(await users.findById(fr))
        // })
        return res.status(200).send({ receivedRequests })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "problem while getting friend suggestions" })
    }
}