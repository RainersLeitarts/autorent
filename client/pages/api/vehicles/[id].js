import connectMongo from "../../../utils/connectMongo";
import Vehicle from '../../../models/vehicle'

export default async (req, res) => {
    try {
        const {id} = req.query
        console.log(id)

        console.log('Connecting to DB...')
        await connectMongo()
        console.log('Connected to DB!')

        console.log('Fetching vehicle...')
        const vehicle = await Vehicle.findById(id)
        console.log('Vehicle Fetched!')
        console.log(vehicle)
        res.json({ vehicle })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}
