const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })

        const newUser = await user.save()
        res.status(201).json({message: "Created new user: " + newUser.username})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username}, {password: 1})
        //check if user exists
        if(user === null) throw Error("Can't find user: " + req.body.username)
        //compare passwords
        if(!await bcrypt.compare(req.body.password, user.password)) throw Error("Incorrect password!")
        //successful login

        const accessToken = generateAccessToken(user._id)

        res.json({accessToken})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const generateAccessToken = (id) => {
    id = id.toString()
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1000s'})
}

module.exports = {
    registerUser,
    loginUser
}