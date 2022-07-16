import { TEST } from '../types'

const main = (state = {
    testInfo: {
        name: 'test'
    }
}, action) => {
    switch(action.type){
        case TEST:
            return{...state, testInfo:{
                name: action.payload
            }}
        default:
            return {...state}
    }
}

export default main