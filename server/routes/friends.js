import express from 'express';
import { addFriend, removeFriend, getAllFriends, getSuggestions, acceptFriend, getAllFriendRequests, getSuggestions2, getSentRequests } from '../controllers/friends.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/friends/:id', auth, getAllFriends)
router.get('/', auth, getSuggestions2)
router.post('/add/:friend', auth, addFriend)
router.delete('/remove/:friend', auth, removeFriend)
router.patch('/accept/:friend', auth, acceptFriend)
router.get('/requests', auth, getAllFriendRequests)
router.get('/requests/sent', auth, getSentRequests)

export default router