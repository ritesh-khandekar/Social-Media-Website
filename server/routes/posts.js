import express from 'express';
import { newPost, getAllPosts, likePost, deletePost, getFeedPosts } from '../controllers/posts.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/friend/:id', auth, getAllPosts)
router.get('/', auth, getFeedPosts)
router.post('/new', auth, newPost)
router.delete('/delete/:postID', auth, deletePost)
router.patch('/like/:postID', auth, likePost)

export default router