const INITIAL_VALUE = {
    doctors: []
}

export default function doctorsReducer(state= INITIAL_VALUE, action){
    switch(action.type){
        case 'GET_DOCTORS_LIST':
            return{
                ...state,
                doctors: action.payload
            }
        default: 
           return state
    }
}