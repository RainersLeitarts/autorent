import connectMongo from "../../../utils/connectMongo";
import User from '../../../models/user'
import bcrypt from 'bcrypt'

export default async (req, res) => {
    try {
        console.log('Connecting to DB...')
        await connectMongo()
        console.log('Connected to DB!')

        console.log('Creating user...')

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })

        const response = await user.save()

        console.log('User created!')

        res.status(201).json({ message: 'User created!' })
    } catch (error) {
        console.log(error)
        res.json({ error })
    }
}