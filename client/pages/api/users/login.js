import connectMongo from "../../../utils/connectMongo";
import User from '../../../models/user'
import bcrypt from 'bcrypt'

export default async (req, res) => {
    try {
        console.log('Connecting to DB...')
        await connectMongo()
        console.log('Connected to DB!')

        console.log('Creating user...')

        const user = await User.findOne({ username: req.body.username }, { password: 1 })

        if(user === null ) throw Error("Can't find user: " + req.body.username)

        if(!await bcrypt.compare(req.body.password, user.password)) throw Error("Incorrect password!")

        console.log('User loggen in!')

        res.status(201).json({ message: 'User logged in!' })
    } catch (error) {
        console.log(error)
        res.json({ error })
    }
}