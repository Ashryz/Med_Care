import { CardAppointment } from "../../Components/ViewAppointment/CardAppointment";
import { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../../Network/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAppoitmentListbydoctor } from "../../Store/Actions/Actions";


export const ViewAppointment = () => {
  // const [appointments, setappointments] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(appointments.count / pageSize);
  const dispatch = useDispatch()
  const appointments = useSelector((state) => state.combinedocAppointment.appointments)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  const totalPages = Math.ceil(appointments.count / pageSize);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(getAppoitmentListbydoctor(currentPage, pageSize, currentUser.id));
    }
  }, [dispatch, currentPage, pageSize, currentUser]);

  // useEffect(() => {
  //   if (currentUser.is_doctor) {
  //     axiosInstance
  //       .get(`/appointments/all_app/doctor/${currentUser.id}/`,
  //        {
  //   params: {
  //     p: page,
  //     page_size: pageSize
  //   }
  // })
  //       .then((res) => {
  //         console.log(currentUser)
  //         setappointments(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     axiosInstance
  //       .get(`/appointments/all_app/user/${currentUser.id}`)
  //       .then((res) => {
  //         setappointments(res.data);

  //         console.log(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [currentPage, pageSize, currentUser]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="mb-3 ">
          {Array.isArray(appointments) && appointments.map((appointment) => {
            return (
              <div key={appointment.id}>
                <CardAppointment appointment={appointment} />
              </div>
            );
          })}
        </div>
      </div>
      <Pagination className="mt-3 justify-content-center">
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
    </div>
  );
};
