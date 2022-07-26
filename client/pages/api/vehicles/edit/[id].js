import connectMongo from "../../../../utils/connectMongo";
import Vehicle from '../../../../models/vehicle'

export default async (req, res) => {
    try {
        const {id} = req.query
        console.log('Connecting to DB...')
        await connectMongo()
        console.log('Connected to DB!')
        //Get single vehicle then update 

        console.log('Editing vehicle...')
        let vehicle = await Vehicle.findById(id)

        for (let argument in req.body) {
            vehicle[argument] = req.body[argument]
        }
        console.log(vehicle)

        const updatedVehicle = await vehicle.save()
        console.log('Vehicle edited!')

        res.json({ updatedVehicle })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}