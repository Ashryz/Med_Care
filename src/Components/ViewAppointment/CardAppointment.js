import React from "react";
import { Button } from "react-bootstrap";

const CardAppointment = ({
  appointment,
  currentUser,
  handleAppointmentAction,
}) => {
  const isDoctor = currentUser?.is_doctor;

  const handleAccept = () => {
    handleAppointmentAction(appointment, true, "accepted");
  };

  const handleReject = () => {
    handleAppointmentAction(appointment, false, "rejected");
  };

  return (
    <div className="card text-white shadow rounded-1 shadow ">
      <div className="card-body">
        <div className="row">
          <div className="col">
            {isDoctor && (
              <p className="fs-5 fw-bold  text-muted text-dark mb-0">
                Phone:
                <span className="ms-2 fs-5 text-muted">
                  {appointment.user.phone}
                </span>
              </p>
            )}

            <p className="fs-5 text-muted mb-0">
              <span className="fw-bold">
                {isDoctor
                  ? `ID : ${appointment.id}`
                  : `Doctor : ${appointment.doctor.user.first_name} ${appointment.doctor.user.last_name}`}
              </span>
            </p>
            <p className="fs-5 fw-bold text-muted mb-0">
              {isDoctor ? "Patient Name " : " "}
              <span className="fs-5 text-muted text-capitalize">
                {isDoctor
                  ? ` ${appointment.user.first_name} ${appointment.user.last_name}`
                  : appointment.user.email}
              </span>
            </p>

            <p className="fs-5 fw-bold text-muted mb-0">
              Date:{" "}
              <span className="fs-5 text-muted">
                {appointment.create_at.slice(0, 10)}
              </span>
            </p>

            {!isDoctor && (
              <>
                <p className="fs-5 fw-bold text-muted mb-0">Dr-Phone: 
                  <span className="fs-5 text-muted">
                    {appointment.doctor.user.phone}
                  </span>
                </p>
                
              </>
            )}
            <p className="fs-5 fw-bold text-muted mb-0">
              Payment:{" "}
              <span className="fs-5 text-muted">
                {appointment.payment_status}
              </span>
            </p>

            {!isDoctor && (
              <div className="my-3 d-flex justify-content-center">
                <Button className="btn btn-primary me-2">
                  {appointment.status}
                </Button>
              </div>
            )}
            {isDoctor && (
              <div className="my-3 d-flex justify-content-center">
                {appointment.is_accepted ? (
                  <Button className="btn btn-success me-2" onClick={handleReject}>
                    Accepted
                  </Button>
                ) : (
                  <Button className="btn btn-danger me-2" onClick={handleAccept}>
                    Accept
                  </Button>

                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAppointment;
