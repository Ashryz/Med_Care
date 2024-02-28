const INITIAL_VALUE ={
    appointments:[]
}

 const SchaduleReducer= ( state =INITIAL_VALUE ,action)=>{
    switch(action.type){
        case 'ADD_TO_SCHADULE':
            return{
                ...state,
                appointments:[...state.appointments,action.payload] 
            }
        case 'REMOVE_SCHADULE':
            return{
                ...state,
                appointments:state.appointments.filter((appointment) => appointment !== action.payload)
            }
        default :
            return state;

    }
};
export default SchaduleReducer;