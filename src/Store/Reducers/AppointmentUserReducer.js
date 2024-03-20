const INITIAL_VALUE = {
    appointments: []
}

export default function appointmentuserReducer(state= INITIAL_VALUE, action){
    switch(action.type){
        case 'GET_APPOINTMENT_USER_LIST':
            return{
                ...state,
                appointments: action.payload
            }
        default: 
           return state
    }
}