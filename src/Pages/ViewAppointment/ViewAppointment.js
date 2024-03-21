import React, { useEffect, useState, useContext } from "react";
import CardAppointment from "../../Components/ViewAppointment/CardAppointment";
import { AuthContext } from "../../context/AuthContext";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAppoitmentListbydoctor } from "../../Store/Actions/Actions.js";
import { getAppoitmentListbyuser } from "../../Store/Actions/Actions.js";
import { axiosInstance } from "../../Network/axiosInstance.js";

export const ViewAppointment = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;

  const doctorAppointments = useSelector(
    (state) => state.combinedocAppointment.appointments
  );
  const userAppointments = useSelector(
    (state) => state.combineuserAppointment.appointments
  );


  // Calculating the total number of appointments
  const totalDoctorAppointments = doctorAppointments.results
    ? doctorAppointments.results.length
    : 0;
  const totalUserAppointments = userAppointments.results
    ? userAppointments.results.length
    : 0;

    const totalPagesDoctor = Math.ceil(doctorAppointments.count / pageSize);
    const totalPagesUser = Math.ceil(userAppointments.count / pageSize);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(
        getAppoitmentListbydoctor(currentPage, pageSize, currentUser.id)
      );
      dispatch(getAppoitmentListbyuser(currentPage, pageSize, currentUser.id));
    }
  }, [dispatch, currentPage, pageSize, currentUser]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAppointmentAction = (appointment, isAccepted, status) => {
    console.log(appointment);
    const response = axiosInstance.put(
      `/schedules/appointment/${appointment.id}/`,
      {
        doctor: appointment.doctor,
        user: appointment.user.id,
        schedule: appointment.schedule,
        is_accepted: isAccepted,
        status: status,
      }
    );
    if (response) {
      console.log(response);
    }
  };

  return (
    <div className="container" style={{ minHeight: "36.6vh" }}>
      <div className="text-center mb-3">
        <h1 className="text-center text-capitalize">View Appointments</h1>
        {currentUser && currentUser.is_doctor && (
          <h3>Total Appointments {doctorAppointments.count}</h3>
        )}
        {currentUser && currentUser.is_patient && (
          <h3>Total Appointments {userAppointments.count}</h3>
        )}
      </div>
      {totalDoctorAppointments > 0 || totalUserAppointments > 0 ? (
        <>
          <div className="">
            <div className="mb-3 row row-cols-3">
              {(currentUser?.is_doctor
                ? doctorAppointments.results
                : userAppointments.results
              )?.map((appointment) => (
                <div key={appointment.id}>
                  <CardAppointment
                    appointment={appointment}
                    currentUser={currentUser}
                    handleAppointmentAction={handleAppointmentAction}
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
            {Array.from(
              {
                length:
                  totalPagesDoctor > totalPagesUser
                    ? totalPagesDoctor
                    : totalPagesUser,
              },
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage ===
                (totalPagesDoctor > totalPagesUser
                  ? totalPagesDoctor
                  : totalPagesUser)
              }
            />
            <Pagination.Last
              onClick={() =>
                handlePageChange(
                  totalPagesDoctor > totalPagesUser
                    ? totalPagesDoctor
                    : totalPagesUser
                )
              }
              disabled={
                currentPage ===
                (totalPagesDoctor > totalPagesUser
                  ? totalPagesDoctor
                  : totalPagesUser)
              }
            />
          </Pagination>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-muted">No Appointments Found</h1>
          <hr className="w-75 mx-auto sec-color shadow rounded-5" />
        </div>
      )}
    </div>
  );
};

export default ViewAppointment;
