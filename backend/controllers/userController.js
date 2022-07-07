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
        res.status(201).json({ message: "Created new user: " + newUser.username })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }, { password: 1 })
        //check if user exists
        if (user === null) throw Error("Can't find user: " + req.body.username)
        //compare passwords
        if (!await bcrypt.compare(req.body.password, user.password)) throw Error("Incorrect password!")
        //successful login

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        console.log(refreshToken)
        await user.updateOne({ $set: { refreshToken } }, { upsert: true })

        res.json({ accessToken, refreshToken })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const refreshToken = async (req, res) => {
    try {
        if (req.body.refreshToken === null) return res.status(401).json({ message: "No refresh token" })
        console.log(req.body.refreshToken)
        const user = await User.findOne({ refreshToken: req.body.refreshToken })
        console.log(user)
        if (user === null) return res.status(403).json({ message: "Invalid refresh token" })

        jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ err })
            const accessToken = generateAccessToken(decoded.id)
            res.json({ accessToken })
        })

    } catch (error) {
        res.status(500).json({ error })
    }
}

const logoutUser = async (req, res) => {
    if(req.body.refreshToken === null) return res.status(401).json({ message: "No refresh token" })
    const user = await User.findOneAndUpdate({ refreshToken: req.body.refreshToken }, {$unset: {refreshToken: ""}})
    if(user === null) return res.json({ message: "User not logged in" })
    res.json({ message: 'User logged out' })
}

const generateAccessToken = (id) => {
    id = id.toString()
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1000s' })
}

const generateRefreshToken = (id) => {
    id = id.toString()
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
}


module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser
}