import connectMongo from "../../../utils/connectMongo";
import Vehicle from '../../../models/vehicle'

export default async (req, res) => {
    try {
        console.log('Connecting to DB...')
        await connectMongo()
        console.log('Connected to DB!')

        console.log('Fetching vehicles...')
        const vehicles = await Vehicle.find()
        console.log('Vehicles Fetched!')
        res.json({ vehicles })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}
