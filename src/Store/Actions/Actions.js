import { axiosInstance } from "../../Network/axiosInstance";


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

export const getDoctorsList = () => (dispatch)  => {

    return axiosInstance.get("/doctors/doctors/")
    .then((res) => dispatch({
        type: "GET_DOCTORS_LIST",
        payload: res.data
    })) 
    .catch((err) => console.log(err))
}