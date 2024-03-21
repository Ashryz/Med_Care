import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";

function CartAppPat({ appointment, handlePayment, refresh }) {
  const [data, setData] = useState({
    payment_status: "paid",
    payment_method: "Visa",
    payment_date: new Date(),
    payment_amount: appointment.doctor.fees,
    payment_transaction_id: "123456",
  });
  // handle payment
  const handlePay = () => {
    handlePayment(appointment, data);
    refresh();
  };

  return (
    <div
      className="card text-white shadow rounded-1 shadow border border-0 "
      style={{ backgroundColor: "#f8f9fa", minHeight: "35vh" }}
    >
      <div className="card-header  border-0">
        <h3 className="card-title fs-5 fw-bold text-capitalize sec-color text-center">
          Appointment
        </h3>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col">
            <p className="fs-6 fw-bold mb-0 sec-color">
              Phone:
              <span className="ms-2 fs-6 text-muted">
                {appointment.doctor.user.phone}
              </span>
            </p>
            <p className="fs-6 fw-bold  mb-0 sec-color">
              Name:{" "}
              <span className="fs-6 text-muted text-capitalize">
                {appointment.doctor.user.first_name}{" "}
                {appointment.doctor.user.last_name}
              </span>
            </p>

            <p className="fs-6 fw-bold  mb-0 sec-color text-capitalize">
              Day:{" "}
              <span className="fs-6 text-muted">
                {appointment.schedule.day}
              </span>
            </p>

            <p className="fs-6 fw-bold  mb-0 sec-color">
              Time:{" "}
              <span className="fs-6 text-muted">
                {appointment.schedule.start_time} -{" "}
                {appointment.schedule.end_time}
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
            <div className="my-3 d-flex justify-content-center">
              {appointment.payment_status === "pending" &&
                appointment.status === "accepted" && (
                  <Button className="btn sec-btn" onClick={handlePay}>
                    Pay Now
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartAppPat;
