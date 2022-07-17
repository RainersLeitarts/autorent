import { CREATE_VEHICLE_REQUEST, CREATE_VEHICLE_SUCCESS, CREATE_VEHICLE_FAIL} from '../reducers/VehicleSlice'
import axios from 'axios'


const UPLOAD_PRESET = "vehicle-images"
export const postVehicle = (images) => async (dispatch) => {
    try {
        dispatch(CREATE_VEHICLE_REQUEST())

        const formData = new FormData()
        formData.append('upload_preset', UPLOAD_PRESET)

        //iterate over images
        formData.append('file', images[0])

        //await response, get image urls
        const response = await axios.post('https://api.cloudinary.com/v1_1/dmau27ozz/image/upload', formData)

        //make post request to mongodb to store vehicle data with images 

        dispatch(CREATE_VEHICLE_SUCCESS(response.data['secure_url']))
    } catch (error) {
        dispatch(CREATE_VEHICLE_FAIL(error.message))
    }
}