import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Network/axiosInstance";
import { FaRegCheckCircle } from "react-icons/fa";
const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get the payment getway callback from the url  and display it on the page
  const urlParams = new URLSearchParams(window.location.search);
  const data = localStorage.getItem("payment");

  console.log(data);
  console.log(urlParams.size);
  const handlePayment = useCallback(async (data) => {
    try {
      const response = await axiosInstance.put(
        `/appointments/pay/${data.appointment_id}/`,
        {
          doctor: data.schedule.doctor,
          user: data.user,
          schedule: data.schedule.id,
          payment_status: data.payment_status,
          payment_method: data.payment_method,
          payment_amount: data.payment_amount,
          payment_transaction_id: urlParams.get("id") || "123456",
        }
      );

      if (response) {
        console.log(response.data);
        localStorage.removeItem("payment");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Error occurred while updating appointment:", error);
    }
  }, []);

  useEffect(() => {
    if (urlParams.size === 0) {
      navigate("/");
    } else {
      handlePayment(JSON.parse(data));
      console.log("Payment Success");
    }
  }, [urlParams]);

  return (
    <div
      style={{ minHeight: "36.6vh" }}
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <FaRegCheckCircle
        className="text-success animate__animated animate__bounce"
        size={100}
      />
      <h1 className="text-success">Payment Success</h1>
      <p className="text-success">Redirecting to home page in 3 seconds...</p>
    </div>
  );
};
export default Success;
