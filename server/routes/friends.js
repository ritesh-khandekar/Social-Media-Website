import express from 'express';
import { addFriend, removeFriend, getAllFriends } from '../controllers/friends.js'

const router = express.Router();

router.get('/:id', getAllFriends)
router.post('/add/:friend1/:friend2', addFriend)
router.delete('/remove/:friend', removeFriend)

export default router