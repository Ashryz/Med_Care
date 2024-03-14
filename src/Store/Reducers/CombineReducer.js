import { combineReducers } from 'redux';
import SchaduleReducer from './SchaduleReducer';
import ThemesReducer from './ThemesReducer';



export default combineReducers({
   
    combineSchadule:SchaduleReducer,
    combineThemes:ThemesReducer,
    
})