import React from "react";
import { CiCalendarDate, CiAlarmOn } from "react-icons/ci";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../Network/axiosInstance";
import { useNavigate } from "react-router-dom";

function AppDocCard({ appointments }) {
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  const navigate = useNavigate();
  const handleBookAppointment = (appointmentId, doctorId) => {
    const newAppointment = {
      schedule: appointmentId,
      user: currentUser.id,
      doctor: doctorId,
    };
    console.log("Booked Appointment Data:", newAppointment);

    axiosInstance
      .post("/appointments/all_app/", newAppointment)
      .then((response) => {
        // Display success alert
        navigate("/Appointments");
        console.log("Appointment booked successfully!", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error booking appointment:", error);
        alert("Failed to book appointment. Please try again.");
      });
  };

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-4  d-flex justify-content-center align-items-center">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="col mb-4">
            <div className="card app-doc-bg shadow border border-0">
              <div className="card-body">
                <div className="text-center ">
                  <h5 className="card-title text-capitalize text-center d-flex justify-content-center align-items-center">
                    <CiCalendarDate className="me-2 fs-2" />
                    {appointment.day}
                  </h5>
                </div>
                <hr className="sec-color" />
                <CiAlarmOn className="me-2 fs-2" />
                <p className="card-text">
                  <span className="text-capitalize">Start Time: </span>
                  {appointment.start_time}
                </p>
                <p className="card-text">
                  <span className="text-capitalize">End Time: </span>
                  {appointment.end_time}
                </p>
                <p className="card-text">
                  <span className="text-capitalize">Status: </span>
                  {appointment.is_active ? "Active" : "Inactive"}
                </p>
                <button
                  className="btn sec-btn shadow"
                  onClick={() =>
                    handleBookAppointment(appointment.id, appointment.doctor)
                  }
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppDocCard;
