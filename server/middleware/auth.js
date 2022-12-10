import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        let decodeData = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decodeData?.id 
        return next()
    } catch (error) {
        return res.status(400).send({ message: 'Token verification failed'})
    }
}

export default auth;