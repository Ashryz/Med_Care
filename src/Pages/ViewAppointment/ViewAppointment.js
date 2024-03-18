import { CardAppointment } from "../../Components/ViewAppointment/CardAppointment";
import { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../../Network/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
// import { Link } from "react-router-dom";

export const ViewAppointment = () => {
  const [appointments, setappointments] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  useEffect(() => {
    if (currentUser.is_doctor) {
      axiosInstance
        .get(`/appointments/all_app/doctor/${currentUser.id}`)
        .then((res) => {
          setappointments(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axiosInstance
        .get(`/appointments/all_app/user/${currentUser.id}`)
        .then((res) => {
          setappointments(res.data);

          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="mb-3 ">
          {appointments.map((appointment) => {
            return (
              <div key={appointment.id}>
                <CardAppointment appointment={appointment} />
              </div>
            );
          })}
        </div>
      </div>

      {/* <Pagination className="mt-3 justify-content-center">
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
            </Pagination> */}
    </div>
  );
};
