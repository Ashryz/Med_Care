import { combineReducers } from 'redux';
import SchaduleReducer from './SchaduleReducer';
import ThemesReducer from './ThemesReducer';
import doctorsReducer from './DoctorsReducers';
import appointmentdoctorReducer from './AppointmentsReducer';
import appointmentuserReducer from './AppointmentUserReducer';
import AlertReducer from './AlertReducer';
import PaymentReducer from './PaymentReducer';



export default combineReducers({
   
    combineSchadule:SchaduleReducer,
    combineThemes:ThemesReducer,
    combineDoctors:doctorsReducer,
    combinedocAppointment:appointmentdoctorReducer,
    combineuserAppointment:appointmentuserReducer,
    combineAlert:AlertReducer,
    combinePayment:PaymentReducer,
    
})