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
        const vehicle = await Vehicle.updatMany()
        console.log('Vehicle edited!')

        res.json({ vehicle })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}