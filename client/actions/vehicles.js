import axios from 'axios'

const DEVELOPMENT_API_URL = 'http:localhost:3000/api'

export const create = async (values, images) => {
    console.log(images)



    // const response = await axios.post('/api/vehicles/add',
    // values,
    // {
    //     headers: { "Content-Type": "application/json" }
    // })
    

    // 
    // return response.data
}

export const uploadImages = async (formData) => {
    //handle upload to cloudinary
    
    const response = await axios.post('https://api.cloudinary.com/v1_1/dmau27ozz/image/upload', formData)


    return response.data['secure_url']
    //return array of image 
}