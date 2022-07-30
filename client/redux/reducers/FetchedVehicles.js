import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

export const fetchedVehiclesSlice = createSlice({
    name: 'FetchedVehiclesSlice',
    initialState,
    reducers: {
        STORE_RENTAL_VEHICLES: (state, action) => {
            return {rental_vehicles: action.payload}
        },
        default: (state) => {
            return (state)
        }
    }
})

export const {STORE_RENTAL_VEHICLES} = fetchedVehiclesSlice.actions
export default fetchedVehiclesSlice.reducer