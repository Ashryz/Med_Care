import React from "react";
import { Button } from "react-bootstrap";

const CardAppDoc = ({ appointment, handleAppointmentAction, refresh }) => {
  const handleAccept = () => {
    handleAppointmentAction(appointment, true, "accepted");
    refresh();
  };

  const handleReject = () => {
    handleAppointmentAction(appointment, false, "rejected");
    refresh();
  };

  return (
    <div
      className="card text-white shadow rounded-1 shadow border border-0"
      style={{ backgroundColor: "#f8f9fa", minHeight: "50vh" }}
    >
      <div className="card-header  border-0">
        <h3 className="card-title fs-5 fw-bold text-capitalize sec-color text-center">
          {appointment.user.first_name} {appointment.user.last_name}
        </h3>
      </div>

      <div className="card-body" style={{ backgroundColor: "#77ffe84b" }}>
        <div className="row">
          <div className="col">
            <p className="fs-6 fw-bold mb-0 sec-color">
              ID:
              <span className="ms-2 fs-6 text-muted">{appointment.id}</span>
            </p>
            <p className="fs-6 fw-bold mb-0 sec-color">
              Phone:
              <span className="ms-2 fs-6 text-muted">
                {appointment.user.phone}
              </span>
            </p>
            <p className="fs-6 fw-bold  mb-0 sec-color">
              Name:{" "}
              <span className="fs-6 text-muted text-capitalize">
                {appointment.user.first_name} {appointment.user.last_name}
              </span>
            </p>

            <p className="fs-6 fw-bold  mb-0 sec-color">
              Date:{" "}
              <span className="fs-6 text-muted">
                {appointment.create_at.slice(0, 10)}
              </span>
            </p>

            <p className="fs-6 fw-bold  mb-0 sec-color">
              Schedual:{" "}
              <span className="fs-6 text-muted">
                {appointment.schedule.day}
              </span>
            </p>

            <p className="fs-6 fw-bold  mb-0 sec-color">
              Time:{" "}
              <span className="fs-6 text-muted">
                {appointment.create_at.slice(11, 16)}
              </span>
            </p>
            <p className="fs-6 fw-bold  mb-0 sec-color">
              Status:{" "}
              <span className="fs-6 text-muted text-capitalize">
                {appointment.status}
              </span>
            </p>
            <p className="fs-6 fw-bold  mb-0 sec-color">
              Payment:{" "}
              <span className="fs-6 text-muted text-capitalize">
                {appointment.payment_status}
              </span>
            </p>
            <p className="fs-6 fw-bold  mb-0 sec-color">
              Day:{" "}
              <span className="fs-6 text-muted text-capitalize">
                {appointment.schedule.day}
              </span>
            </p>
            <div className="my-3 d-flex justify-content-center">
              {!appointment.is_accepted &&
                appointment.status !== "rejected" && (
                  <Button className="me-2 main-btn" onClick={handleAccept}>
                    Accept
                  </Button>
                )}
              {appointment.payment_status === "pending" &&
                appointment.status === "pending" &&
                (
                  <Button className="sec-btn" onClick={handleReject}>
                    Reject
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAppDoc;
