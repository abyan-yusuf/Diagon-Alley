import User from '../models/authModel.js'
import JWT from 'jsonwebtoken';
import { comparePassword, hashPassword } from '../utilities/authHelper.js';
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name || !email || !password || !phone || !address) {
            return res.status(406).send({message: "Please enter a name, email, password, phone, address"})
        }

        const userByEmail = await User.findOne({ email })
        const userByPhone = await User.findOne({ phone })
        if (userByEmail || userByPhone || (userByEmail && userByPhone)) {
            return res.status(400).send({ message: "User already exists with this email or phone" })
        }

        const hashedPassword = await hashPassword(password)

        const newUser = new User({ name, email, password: hashedPassword, phone, address })
        newUser.save()

        res.status(201).send({ message: "successfully created" })
    } catch (error) {
        res.send(404).send({error: error})
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) { 
            return res.status(400).send({ message: "Please enter your email address and password"})
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({ message: "user does not exists" })
        }
        const actualPassword = await comparePassword(password, user.password)
        if (!actualPassword) {
            return res.status(400).send({ message: "Incorrect Password" })
        }
        const token = JWT.sign({_id:user._id}, process.env.secret_key, { expiresIn: '7d' })
        res.status(200).send({message: "Logged in successfully", allInfo: user, token})
    } catch (error) {
        console.error(error)
    }
}

export const allUsers = async (req, res) => { 
    try {
        const allUsers = await User.find()
        res.status(200).send({ message: "All users", allUsers })
    } catch (error) {
        console.error(error)
    }
}