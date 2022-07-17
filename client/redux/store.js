import { configureStore } from '@reduxjs/toolkit'
import vehicleReducer from './reducers/VehicleSlice'


export const store = configureStore({
    reducer: {vehicle: vehicleReducer}
})