const User = require('../models/user')
const bcrypt = require('bcrypt')

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

        res.json({message: "Login successful!"})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    registerUser,
    loginUser
}