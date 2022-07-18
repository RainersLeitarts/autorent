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
            return {loading: false, success: action.payload}
        },
        CREATE_VEHICLE_FAIL: (state, action) => {
            return {loading: false, error: action.payload}
        },
        STORE_RENTAL_VEHICLES: (state, action) => {
            return {...state, rental_vehicles: action.payload}
        }
    }
})

export const {CREATE_VEHICLE_REQUEST, CREATE_VEHICLE_SUCCESS, CREATE_VEHICLE_FAIL, STORE_RENTAL_VEHICLES} = vehicleSlice.actions
export default vehicleSlice.reducer