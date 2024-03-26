import { Container, Row, Pagination, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CardSmallDoc from "../CardDoctor/CardSmallDoc";
import { getDoctorsList } from "../../Store/Actions/Actions";

function ListDoctor() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.combineDoctors.doctors);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    dispatch(getDoctorsList(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const totalPages = Math.ceil(doctors.count / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className=" container mt-5 mb-5" >
      {doctors.results && doctors.results.length > 0 ? (
        <>
          <div className="row">
            {Array.isArray(doctors.results) &&
              doctors.results.map((doctor) => (
                <div className="col-12">
                  <CardSmallDoc key={doctor.user.id} doc={doctor} />
                </div>
              ))}
          </div>
          <div className="row">
          <Pagination className="mt-3 justify-content-center" >
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
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
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="">No Doctors Found</h1>
          <hr className="w-75 mx-auto sec-color shadow rounded-5" />
        </div>
      )}
    </div>
  );
}
export default ListDoctor;
