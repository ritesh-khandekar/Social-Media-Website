import express from 'express';
import { addFriend, removeFriend, getAllFriends, getSuggestions, acceptFriend, getAllFriendRequests, getSuggestions2 } from '../controllers/friends.js'
import auth from '../middleware/auth.js'
const router = express.Router();

// router.get('/:id', getAllFriends)
router.get('/',auth, getSuggestions2)
router.post('/add/:friend', auth, addFriend)
router.delete('/remove/:friend', auth, removeFriend)
router.patch('/accept/:friend', auth, acceptFriend)
router.get('/requests', getAllFriendRequests)

export default router