import { combineReducers } from 'redux';
import SchaduleReducer from './SchaduleReducer';
import ThemesReducer from './ThemesReducer';
import doctorsReducer from './DoctorsReducers';
import appointmentdoctorReducer from './AppointmentsReducer';



export default combineReducers({
   
    combineSchadule:SchaduleReducer,
    combineThemes:ThemesReducer,
    combineDoctors:doctorsReducer,
    combinedocAppointment:appointmentdoctorReducer,
    
})