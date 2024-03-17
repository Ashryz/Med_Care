import { combineReducers } from 'redux';
import SchaduleReducer from './SchaduleReducer';
import ThemesReducer from './ThemesReducer';
import doctorsReducer from './DoctorsReducers';



export default combineReducers({
   
    combineSchadule:SchaduleReducer,
    combineThemes:ThemesReducer,
    combineDoctors:doctorsReducer,
    
})