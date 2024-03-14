

export const Login = (email , password) => ({
    type:"LOGIN",
    payload:{email,password}
})


export const Logout = (payload) => ({
    type:"LOGOUT",
    payload
})


export const addAppointmentSchadule = (appointment) =>{
    return {
        type:'ADD_TO_SCHADULE',
        payload:appointment
    }
};
export const removeAppointmentSchadule = (appointment) =>{
    return {
        type:'REMOVE_SCHADULE',
        payload:appointment
    }
};

export const themesAction = (payload) => ({
    type:'CHANGE_THEME',
    payload
});