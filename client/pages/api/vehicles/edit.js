import connectMongo from "../../../utils/connectMongo";
import Vehicle from '../../../models/vehicle'

export default async (req, res) => {
    try {
        console.log('Connecting to DB...')
        await connectMongo()
        console.log('Connected to DB!')

        console.log('Editing vehicle...')
        const vehicle = await Vehicle.create(req.body)
        console.log('Vehicle edited!')

        res.json({ vehicle })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}