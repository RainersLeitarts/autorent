import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementValue: (state, action) => {
            console.log(action.payload)
            state.value += action.payload
        }
    }
})

export const {increment, decrement, incrementValue} = counterSlice.actions
export default counterSlice.reducer