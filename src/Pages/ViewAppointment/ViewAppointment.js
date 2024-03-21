import React, { useEffect, useState, useContext } from "react";
import { CardAppointment } from "../../Components/ViewAppointment/CardAppointment";
import { AuthContext } from "../../context/AuthContext";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAppoitmentListbydoctor } from "../../Store/Actions/Actions.js";
import { getAppoitmentListbyuser } from "../../Store/Actions/Actions.js";

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
  const totalDoctorAppointments = doctorAppointments.results ? doctorAppointments.results.length : 0;
  const totalUserAppointments = userAppointments.results ? userAppointments.results.length : 0;

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

  return (
    <div className="container" style={{ minHeight: "36.6vh" }}>
      <div className="text-center mb-3">
        <h1 className="text-center text-capitalize">View Appointments</h1>
        {currentUser && currentUser.is_doctor && (
          <h3>Total Appointments  {doctorAppointments.count}</h3>
        )}
        {currentUser && currentUser.is_patient && (
          <h3>Total Appointments {userAppointments.count}</h3>
        )}
      </div>
      {(totalDoctorAppointments > 0 || totalUserAppointments > 0) ? (
        <>
          <div className="row">
            <div className="mb-3">
              {currentUser &&
                currentUser.is_doctor &&
                Array.isArray(doctorAppointments.results) &&
                doctorAppointments.results.map((appointment) => (
                  <div key={appointment.id}>
                    <CardAppointment appointment={appointment} />
                  </div>
                ))}
              {currentUser &&
                currentUser.is_patient &&
                Array.isArray(userAppointments.results) &&
                userAppointments.results.map((appointment) => (
                  <div key={appointment.id}>
                    <CardAppointment appointment={appointment} />
                  </div>
                ))}
            </div>
          </div>
          <Pagination className="mt-3 justify-content-center">
            {/* Pagination Controls */}
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
