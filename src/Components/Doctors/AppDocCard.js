import React, { useState } from "react";
import { CiCalendarDate, CiAlarmOn } from "react-icons/ci";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../Network/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaHourglassStart } from "react-icons/fa";
import { Modal } from "react-bootstrap";
function AppDocCard({ appointments }) {
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [serverError, setServerError] = useState(false); // State to determine server availability

  const handleBookAppointment = (appointmentId, doctorId) => {
    setLoading(true);
    setShowModal(true); // Show modal when booking appointment

    const newAppointment = {
      schedule: appointmentId,
      user: currentUser.id,
      doctor: doctorId,
    };
    console.log("Booked Appointment Data:", newAppointment);

    axiosInstance
      .post("/appointments/all_app/", newAppointment)
      .then((response) => {
        dispatch({
          type: "SET_ALERT",
          payload: {
            strong: "Congratulations!",
            txt: " Appointment booked successfully!",
            type: "success",
          },
        });
        setLoading(false);
        navigate("/");
        console.log("Appointment booked successfully!", response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error booking appointment:", error);
        setServerError(true); // Set server error state to true
        dispatch({
          type: "SET_ALERT",
          payload: {
            strong: "Error!",
            txt: " Error booking appointment. Please try again later.",
            type: "danger",
          },
        });
        navigate("/");
      });
  };

  return (
    <div className="container">
      {serverError && (
        <div className="alert alert-danger" role="alert">
          Server is not responding. Please try again later.
        </div>
      )}
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
                {/* <p className="card-text">
                  <span className="text-capitalize">Status: </span>
                  {appointment.is_active ? "Active" : "Inactive"}
                </p> */}
                {currentUser && currentUser.is_patient && (
                  <button
                    className="btn sec-btn shadow"
                    onClick={() =>
                      handleBookAppointment(appointment.id, appointment.doctor)
                    }
                    disabled={loading}
                  >
                    {loading ? "Booking..." : "Book"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for loading indicator */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="text-center sec-color">
          <div className="animate__animated animate__flash">
            <FaHourglassStart size={100} className="sec-color" />
          </div>
          <h2 className="mt-3 sec-color">Booking Appointment...</h2>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AppDocCard;
