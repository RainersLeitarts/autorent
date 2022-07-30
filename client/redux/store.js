import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import fetchedVehicles from './reducers/FetchedVehicles';
import vehicleReducer from './reducers/VehicleSlice'
import userReducer from './reducers/UserSlice'
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedVehicleReducer = persistReducer(persistConfig, fetchedVehicles)

export const store = configureStore({
    reducer: {
        fetchedVehicles: persistedVehicleReducer,
        vehicle: vehicleReducer,
        user: userReducer,
    },
    middleware: [thunk]
})

//persistStore
export const persistor = persistStore(store)