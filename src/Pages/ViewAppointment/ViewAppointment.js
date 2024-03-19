import { CardAppointment } from "../../Components/ViewAppointment/CardAppointment";
import { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../../Network/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import AppointmentCount from "./AppointmentCount";

export const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;

  useEffect(() => {
    if (currentUser.is_doctor) {
      axiosInstance
        .get(`/appointments/all_app/doctor/${currentUser.id}`)
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axiosInstance
        .get(`/appointments/all_app/user/${currentUser.id}`)
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="container">
      <div className="container">
        <AppointmentCount appointments={appointments} />
      </div>
      <div className="row">
        <div className="mb-3 ">
          {appointments.map((appointment) => {
            return (
              <div key={appointment.id}>
                <CardAppointment appointment={appointment} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
