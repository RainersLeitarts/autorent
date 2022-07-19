import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

export const userSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        CREATE_USER_REQUEST: () => {
           return {loading: true}
        },
        CREATE_USER_SUCCESS: (state, action) => {
            console.log('Success')
            return {loading: false, success: action.payload}
        },
        CREATE_USER_FAIL: (state, action) => {
            return {loading: false, error: action.payload}
        },
        default: (state) => {
            return (state)
        }
    }
})

export const {CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAIL} = userSlice.actions
export default userSlice.reducer