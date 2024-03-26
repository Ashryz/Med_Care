import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { axiosInstance } from "../../Network/axiosInstance.js";
import { useDispatch } from "react-redux";
import "./cardpatapp.css";
function CartAppPat({ appointment, handlePayment, refresh }) {
  const [data, setData] = useState({
    payment_status: "paid",
    payment_method: "PayMob",

    payment_amount: appointment.doctor.fees,
    payment_transaction_id: "123456",
  });

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [iframeUrl, setIframeUrl] = useState(null);
  // handle payment
  // const handlePay = () => {
  //   handlePayment(appointment, data);
  //   refresh();
  // };

  const handleClose = () => setShow(false);

  const cancelAppointment = async () => {
    try {
      const response = await axiosInstance.delete(
        `/schedules/appointment/${appointment.id}/`
      );
      console.log(response.data);
      refresh();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const getIframeUrl = async () => {
    try {
      const response = await axiosInstance.get(
        `/appointments/iframe/${appointment.id}/`
      );

      dispatch({
        type: "SET_PAYMENT",
        payload: {
          appointment_id: appointment.id,
          doctor: appointment.doctor,
          user: appointment.user,
          schedule: appointment.schedule,
          is_accepted: appointment.is_accepted,
          payment_status: data.payment_status,
          payment_method: data.payment_method,
          payment_amount: appointment.doctor.fees,
          payment_transaction_id: data.payment_transaction_id,
        },
      });

      localStorage.setItem(
        "payment",
        JSON.stringify({
          appointment_id: appointment.id,
          doctor: appointment.doctor,
          user: appointment.user,
          schedule: appointment.schedule,
          is_accepted: appointment.is_accepted,
          payment_status: data.payment_status,
          payment_method: data.payment_method,
          payment_amount: appointment.doctor.fees,
          payment_transaction_id: data.payment_transaction_id,
        })
      );

      return response.data.iframe_url;
    } catch (error) {
      console.error("Error fetching iframe URL:", error);
      return null;
    }
  };

  const openModal = async () => {
    const url = await getIframeUrl();
    setIframeUrl(url);
    setShow(true);
  };

  return (
    <div
      className="card text-white shadow rounded-1 shadow border border-0 "
      style={{ backgroundColor: "#f8f9fa", minHeight: "43vh" }}
    >
      <div className="card-header  d-flex justify-content-between border-0 align-items-center">
        <h3 className="card-title fs-5 fw-bold text-capitalize sec-color text-center">
          Appointment
        </h3>

        {appointment.payment_status === "pending" && (
          <button
            className="btn sec-btn p-2 rounded-2"
            onClick={cancelAppointment}
          >
            X
          </button>
        )}
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
                  <Button className="btn sec-btn" onClick={openModal}>
                    Pay Now
                  </Button>
                )}
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          className="modal "
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center bg-light">
            <iframe
              title="Payment"
              src={iframeUrl}
              width="100%"
              height="500"
            ></iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default CartAppPat;
