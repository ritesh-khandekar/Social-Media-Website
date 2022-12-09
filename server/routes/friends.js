import express from 'express';
import { addFriend, removeFriend, getAllFriends, getSuggestions } from '../controllers/friends.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/:id', getAllFriends)
router.get('/', auth, getSuggestions)
router.post('/add/:friend', auth, addFriend)
router.delete('/remove/:friend', auth, removeFriend)

export default router