import express from 'express';
import { login, getProfile, signup, updateProfile } from '../controllers/users.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

router.get('/profile/:id', getProfile)
router.patch('/profile/update/:id', auth, updateProfile)

export default router