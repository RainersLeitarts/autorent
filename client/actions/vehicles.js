import axios from 'axios'

const DEVELOPMENT_API_URL = 'http:localhost:3000/api'

export const create = async (values) => {
    const response = await axios.post('/api/vehicles/add',
    values,
    {
        headers: { "Content-Type": "application/json" }
    })
    
    return response.data
}