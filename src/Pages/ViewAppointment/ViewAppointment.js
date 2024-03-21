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

  console.log(doctorAppointments)
  console.log(userAppointments)

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
      {(doctorAppointments.results && doctorAppointments.results.length > 0) || (userAppointments.results && userAppointments.results.length > 0)? (
        <>
          <div className="row">
          <h1 className="text-center  text-capitalize ">View Appointments</h1>
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
