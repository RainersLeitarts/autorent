import { combineReducers, configureStore } from '@reduxjs/toolkit'
import vehicleReducer from './reducers/VehicleSlice'
import userReducer from './reducers/UserSlice'

export const store = configureStore({
    reducer: {
        vehicle: vehicleReducer,
        user: userReducer
    }
})