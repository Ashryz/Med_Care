import { useDispatch, useSelector } from "react-redux";
import { removeAppointmentSchadule } from "../../Store/Actions/Actions";
import Sidebar from "../Dashboard/Sidebar";
import { axiosInstance } from "../../Network/axiosInstance";
// import { Pagination } from "react-bootstrap"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import axios from "axios"

export const Schadule = () => {
  // const [appointment, setappointment] = useState([])
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  // useEffect(() => {
  //     axiosInstance.get(`/appointments/all_app/schedule/${schedule_id}/`)
  //         .then((res) => {
  //             setappointment(res.data);
  //             // setTotalPages(Math.ceil(res.headers["x-total-count"] / 10))
  //             console.log(res)
  //         })
  //         .catch((err) => console.log(err))
  // }, []) //currentPage
  // const handlePageChange = (page) => {
  //     setCurrentPage(page);
  // };

  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const appointments = useSelector(
    (state) => state.combineSchadule.appointments
  );
  const dispatch = useDispatch();

  const handleClose = (item) => {
    dispatch(removeAppointmentSchadule(item));
  };
  const SchaduleItem = (appointment) => {
    return (
      <>
        <div
          className="container mx-auto w-75 my-3 p-0 text-start  rounded-4  shadow col-md-9"
          key={appointment.id}
          style={{
            backgroundImage:
              "linear-gradient(to top,MediumSeaGreen , dodgerBlue)",
          }}
        >
          <div
            className="prim-pg text-center text-white p-2 "
            style={{ borderRadius: "11px 11px 0px 0px" }}
          >
            <span className="fw-bold">Appointment</span>
          </div>
          <button
            onClick={() => handleClose(appointment)}
            className="btn-close float-end"
            aria-label="Close"
          ></button>
          <div className="row ms-3 my-3">
            <div className="p-3 ">
              <div className="d-flex">
                <span className="fs-5 fw-bold text-white">Number :</span>
                <span className="ms-2 fs-5 text-muted"> {appointment.id}</span>
              </div>
              <div className="d-flex">
                <span className="fs-5 fw-bold text-white">Patient Name :</span>
                <span className="ms-2 fs-5 text-muted">
                  {" "}
                  {appointment.user.first_name}
                </span>
                <span className="ms-2 fs-5 text-muted">
                  {" "}
                  {appointment.user.last_name}
                </span>
              </div>
              <div className="d-flex">
                <span className="fs-5 fw-bold text-white">Patient Email :</span>
                <span className="ms-2 fs-5 text-muted">
                  {" "}
                  {appointment.user.email}
                </span>
              </div>
              <div className="d-flex">
                <span className="fs-5 fw-bold text-white">Date :</span>
                <span className="ms-2 fs-5 text-muted">
                  {" "}
                  {appointment.create_at}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const emptySchadule = () => {
    return (
      <div className="px-4 my-4 mx-auto shadow w-75 rounded-4 py-3">
        <div className="container py-4">
          <div className="row">
            <h3>Your Schadule is Empty</h3>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="App">
      <div className="container-fluid ">
        <div className="row">
          <hr />
          <div className="side col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9 mt-3">
            <h2 className="text-muted text-center">
              Your Schedule Appointments
            </h2>
            {appointments.length === 0 && emptySchadule()}
            {appointments.length !== 0 && appointments.map(SchaduleItem)}
          </div>
          {/* <div>
                        <Pagination className="mt-3 justify-content-center ">
                            <Pagination.First onClick={() => handlePageChange(1)} />
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                            {Array.from({ length: totalPages }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                        </Pagination>
                    </div> */}
        </div>
      </div>
    </div>
  );
};
