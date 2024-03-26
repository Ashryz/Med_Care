import React, { useEffect, useState, useContext, useCallback } from "react";
import CardAppDoc from "../../Components/ViewAppointment/CardAppDoc.js";
import CartAppPat from "../../Components/ViewAppointment/CartAppPat.js";
import { AuthContext } from "../../context/AuthContext";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAppoitmentListbydoctor } from "../../Store/Actions/Actions.js";
import { getAppoitmentListbyuser } from "../../Store/Actions/Actions.js";
import { axiosInstance } from "../../Network/axiosInstance.js";
import { useNavigate } from "react-router-dom";

export const ViewAppointment = () => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const navigate = useNavigate();

  const doctorAppointments = useSelector(
    (state) => state.combinedocAppointment.appointments
  );
  const userAppointments = useSelector(
    (state) => state.combineuserAppointment.appointments
  );

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  // const totalPagesDoctor = Math.ceil(doctorAppointments.count / pageSize);
  // const totalPagesUser = Math.ceil(userAppointments.count / pageSize);
  const totalAppointments = currentUser.is_doctor
    ? doctorAppointments.count
    : userAppointments.count;
  const totalPages = Math.ceil(totalAppointments / pageSize);

  const totalDoctorAppointments = doctorAppointments.count;
  const totalUserAppointments = userAppointments.count;
  const handelrefresh = useCallback(() => {
    setRefresh((prevRefresh) => !prevRefresh);
    dispatch(getAppoitmentListbydoctor(currentPage, pageSize, currentUser.id));
    dispatch(getAppoitmentListbyuser(currentPage, pageSize, currentUser.id));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        dispatch(
          getAppoitmentListbydoctor(currentPage, pageSize, currentUser.id)
        );
        dispatch(
          getAppoitmentListbyuser(currentPage, pageSize, currentUser.id)
        );
      }
    };

    fetchData();
  }, [dispatch, currentPage, pageSize, currentUser, refresh]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleAppointmentAction = useCallback(
    async (appointment, isAccepted, status) => {
      try {
        const response = await axiosInstance.put(
          `/schedules/appointment/${appointment.id}/`,
          {
            doctor: appointment.doctor,
            user: appointment.user.id,
            schedule: appointment.schedule.id,
            is_accepted: isAccepted,
            status: status,
          }
        );

        if (response) {
          console.log(response);
          handelrefresh();
          setCurrentPage(1);
        }
      } catch (error) {
        console.error("Error occurred while updating appointment:", error);
      }
    },
    [handelrefresh]
  );

  // handel payment
  const handlePayment = useCallback(
    async (appointment, data) => {
      try {
        const response = await axiosInstance.put(
          `/appointments/pay/${appointment.id}/`,
          {
            doctor: appointment.schedule.doctor,
            user: appointment.user,
            schedule: appointment.schedule.id,
            payment_status: data.payment_status,
            payment_method: data.payment_method,
            payment_date: data.payment_date,
            payment_amount: appointment.doctor.fees,
            payment_transaction_id: "123456",
          }
        );

        if (response) {
          console.log(response);
          handelrefresh();
        }
      } catch (error) {
        console.error("Error occurred while updating appointment:", error);
      }
    },
    [handelrefresh]
  );

  return (
    <div className="container" style={{ minHeight: "38.7vh" }}>
      {totalDoctorAppointments > 0 || totalUserAppointments > 0 ? (
        <>
          <div className="text-center mb-3">
            <h1 className="text-center text-capitalize">View Appointments</h1>
            {currentUser && currentUser.is_doctor && (
              <h3>Total Appointments {doctorAppointments.count}</h3>
            )}
            {currentUser && currentUser.is_patient && (
              <h3>Total Appointments {userAppointments.count}</h3>
            )}
          </div>
          <div className="">
            <div className="mb-3 row ">
              {currentUser.is_doctor &&
                doctorAppointments.results &&
                doctorAppointments.results.map((appointment) => (
                  <div key={appointment.id} className="col-md-4">
                    <CardAppDoc
                      appointment={appointment}
                      handleAppointmentAction={handleAppointmentAction}
                      refresh={handelrefresh}
                    />
                  </div>
                ))}
              {currentUser.is_patient &&
                userAppointments.results &&
                userAppointments.results.map((appointment) => (
                  <div key={appointment.id} className="col-lg-4 col-md-6">
                    <CartAppPat
                      appointment={appointment}
                      handlePayment={handlePayment}
                      refresh={handelrefresh}
                    />
                  </div>
                ))}
            </div>
          </div>
          <Pagination className="mt-3 justify-content-center">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      ) : (
        <div className="text-center">
          <h1 className="">
            <i className="bi bi-table me-2"></i> <br /> No Appointments Found
          </h1>
          <hr className="w-75 mx-auto sec-color shadow rounded-5" />
        </div>
      )}
    </div>
  );
};

export default ViewAppointment;
