import { createSlice } from "@reduxjs/toolkit"


const initialState = {}

export const vehicleSlice = createSlice({
    name: 'VehicleSlice',
    initialState,
    reducers: {
        CREATE_VEHICLE_REQUEST: () => {
           return {loading: true}
        },
        CREATE_VEHICLE_SUCCESS: (state, action) => {
            return {loading: false, message: action.payload}
        },
        CREATE_VEHICLE_FAIL: (state, action) => {
            return {loading: false, message: action.payload}
        }
    }
})

export const {CREATE_VEHICLE_REQUEST, CREATE_VEHICLE_SUCCESS, CREATE_VEHICLE_FAIL} = vehicleSlice.actions
export default vehicleSlice.reducer