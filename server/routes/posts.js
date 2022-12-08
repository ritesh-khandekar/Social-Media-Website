import express from 'express';
import { newPost, getAllPosts, likePost, deletePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/:id', getAllPosts)

router.post('/new', auth, newPost)
router.delete('/delete/:postID', deletePost)

router.patch('/like/:postID', likePost)

export default router