import {CREATE_USER_REQUEST, CREATE_USER_FAIL, CREATE_USER_SUCCESS} from '../../reducers/UserSlice'
import axios from 'axios'

export const signup = (email, username, password) => async (dispatch) => {
    try {
        dispatch(CREATE_USER_REQUEST())
        const response = await axios.post('http://localhost:3000/api/users/signup', {
            email,
            username,
            password
        },
        {
            headers: { "Content-Type": "application/json" }
        })

        if(response.data.error) {
            throw new Error('Aizpildiet visus lauciņus!')
        }

        console.log(response.data)

        dispatch(CREATE_USER_SUCCESS(true))
    } catch (error) {
        dispatch(CREATE_USER_FAIL(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch(CREATE_USER_REQUEST())
        const response = await axios.post('http://localhost:3000/api/users/login', {
            username,
            password
        },
        {
            headers: { "Content-Type": "application/json" }
        })

        if(response.data.error) {
            throw new Error('Aizpildiet visus lauciņus!')
        }

        console.log(response.data)

        dispatch(CREATE_USER_SUCCESS(true))
    } catch (error) {
        dispatch(CREATE_USER_FAIL(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}