import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import users from '../models/users.js'

export const signup = async (req, res) => {
    const { fname, lname, email, phone, birthdate, gender, password } = req.body;
    try {
        const existinguser = await users.findOne({ email });
        if (existinguser) {
            return res.status(404).json({ message: "User already Exist." })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await users.create({ fname, lname, email, phone, birthdate, gender, password: hashedPassword })
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ result: newUser, token })

    } catch (error) {
        res.status(500).json("Something went worng while creating new user...")
    }
}
export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id) || _id !== req.userId) {
        return res.status(404).send('User unavailable...');
    }
    let details = {}
    console.log(req.body)
    for (const param in req.body) {
        if (param && req.body[param] && !req.body[param].match(/^\s*$/)) {
            details[param] = req.body[param]
        }
    }
    try {
        const updatedProfile = await users.findByIdAndUpdate(_id, { $set: details }, { new: true })
        // delete updateProfile['password']
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({ message: error.message })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinguser = await users.findOne({ email }).select("+password").exec();
        if (!existinguser) {
            return res.status(404).json({ message: "User doesn't Exist." })
        }
        const isPasswordCrt = await bcrypt.compare(password, existinguser.password)
        if (!isPasswordCrt) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        delete existinguser.password;
        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ result: existinguser, token })
    } catch (error) {
        res.status(500).json("Something went worng while fetching user from the database...")
    }
}
export const getProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const existinguser = await users.findById(id);
        if (!existinguser) {
            return res.status(404).json({ message: "User doesn't Exist." })
        }
        res.status(200).json({ result: existinguser })
    } catch (error) {
        res.status(500).json("Something went wrong while fetching user from the database...")
    }
}