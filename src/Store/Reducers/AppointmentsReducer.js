const INITIAL_VALUE = {
    appointments: []
}

export default function appointmentdoctorReducer(state= INITIAL_VALUE, action){
    switch(action.type){
        case 'GET_APPOINTMENT_DOCTORS_LIST':
            return{
                ...state,
                appointments: action.payload
            }
        default: 
           return state
    }
}

