import { CREATE_VEHICLE_REQUEST, CREATE_VEHICLE_SUCCESS, CREATE_VEHICLE_FAIL, STORE_RENTAL_VEHICLES } from '../reducers/VehicleSlice'
import axios from 'axios'




const UPLOAD_PRESET = "vehicle-images"
export const postVehicle = (values, images) => async (dispatch) => {
    try {
        dispatch(CREATE_VEHICLE_REQUEST())

        const formData = new FormData()
        formData.append('upload_preset', UPLOAD_PRESET)

        //async function that returns a promise
        const uploadPhotos = async (image) => {
                formData.append('file', image)
                const response = await axios.post('https://api.cloudinary.com/v1_1/dmau27ozz/image/upload', formData)
                return response.data['secure_url']
        }

        //awaits for all promises returned by the map
        const photoUrls = await Promise.all( 
            images.map(uploadPhotos)
         )

        //add image urls to values
        values.images = photoUrls

        const response = await axios.post('http://localhost:3000/api/vehicles/add', values, {
            headers: { "Content-Type": "application/json" }
        })

        if(response.data.error) {
            throw new Error('Aizpildiet visus lauciņus!')
        }

        dispatch(CREATE_VEHICLE_SUCCESS(true))
    } catch (error) {
        dispatch(CREATE_VEHICLE_FAIL(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}

export const editVehicle = (values, deletedImages, newImages) => async (dispatch) => {
    try {
        dispatch(CREATE_VEHICLE_REQUEST())

        const deletePhotos = async (image) => {
            const response = await axios.post('https:')
            
        }

        const formData = new FormData()
        formData.append('upload_preset', UPLOAD_PRESET)

        //async function that returns a promise
        const uploadPhotos = async (image) => {
                formData.append('file', image)
                const response = await axios.post('https://api.cloudinary.com/v1_1/dmau27ozz/image/upload', formData)
                return response.data['secure_url']
        }

        //awaits for all promises returned by the map
        const photoUrls = await Promise.all( 
            newImages.map(uploadPhotos)
         )

        //add image urls to values
        values.newImages = photoUrls

        const response = await axios.post('http://localhost:3000/api/vehicles/add', values, {
            headers: { "Content-Type": "application/json" }
        })

        if(response.data.error) {
            throw new Error('Aizpildiet visus lauciņus!')
        }

        dispatch(CREATE_VEHICLE_SUCCESS(true))
    } catch (error) {
        dispatch(CREATE_VEHICLE_FAIL(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}

export const storeRentalVehicles = (vehicles) => (dispatch) => {
    dispatch(STORE_RENTAL_VEHICLES(vehicles))
}