import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'
import friendRoutes from './routes/friends.js'
import postsRoutes from './routes/posts.js'

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.get('/', (req, res) => {
    res.send("Social Media API")
})

app.use('/user', userRoutes)
app.use('/friend', friendRoutes)
app.use('/posts', postsRoutes)

const PORT = process.env.PORT

const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`server running on port ${PORT}`) }))
    .catch((err) => console.log(err.message))