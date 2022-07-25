import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: 'dmau27ozz',
    api_key: '772896667624759',
    api_secret: 'hmrgrmXA-hzfunm1Tx31Yl2Wxq0'
})

export default async (req, res) => {
    try {
        const {id} = req.query
        const response = await cloudinary.uploader.destroy('vehicle-images/'+id)
        res.json({message: response.result})
    } catch (error) {
        res.json({message: error.message})
    }
}