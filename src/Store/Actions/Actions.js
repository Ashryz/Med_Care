import { axiosInstance } from "../../Network/axiosInstance";

export const Login = (email, password) => ({
  type: "LOGIN",
  payload: { email, password },
});

export const Logout = (payload) => ({
  type: "LOGOUT",
  payload,
});

export const addAppointmentSchadule = (appointment) => {
  return {
    type: "ADD_TO_SCHADULE",
    payload: appointment,
  };
};
export const removeAppointmentSchadule = (appointment) => {
  return {
    type: "REMOVE_SCHADULE",
    payload: appointment,
  };
};

export const themesAction = (payload) => ({
  type: "CHANGE_THEME",
  payload,
});

// export const getDoctorsList = (page = 1, pageSize = 10) => (dispatch) => {
//     return axiosInstance.get(`/doctors/doctors/?p=${page}&page_size=${pageSize}`)
//         .then((res) => {
//             dispatch({
//                 type: "GET_DOCTORS_LIST",
//                 payload: res.data
//             });
//         })
//         .catch((err) => console.log(err));
// };
export const getDoctorsList =
  (page = 1, pageSize = 10, query = "") =>
  (dispatch) => {
    const url = `/doctors/doctors/?p=${page}&page_size=${pageSize}&q=${query}`;

    return axiosInstance
      .get(url)
      .then((res) => {
        dispatch({
          type: "GET_DOCTORS_LIST",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

export const getAppoitmentListbydoctor =
  (page = 1, pageSize = 10, id) =>
  (dispatch) => {
    const url = `/appointments/all_app/doctor/${id}/?p=${page}&page_size=${pageSize}`;

    return axiosInstance
      .get(url)
      .then((res) => {
        dispatch({
          type: "GET_APPOINTMENT_DOCTORS_LIST",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

export const getAppoitmentListbyuser =
  (page = 1, pageSize = 10, id) =>
  (dispatch) => {
    const url = `/appointments/all_app/user/${id}/?p=${page}&page_size=${pageSize}`;

    return axiosInstance
      .get(url)
      .then((res) => {
        dispatch({
          type: "GET_APPOINTMENT_USER_LIST",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };


export const alertAction = (payload) => ({
  type: "SET_ALERT",
  payload,
});

export const handelpayment = (payload) => ({
  type: "HANDLE_PAYMENT",
  payload,
});

