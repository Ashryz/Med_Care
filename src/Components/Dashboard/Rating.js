import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Pagination } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "./style.css";
import { axiosInstance } from "../../Network/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import RatingCardForDoc from "../../Pages/Doctors/RatingCardForDoc";
import "../Doctors/rating_card_for_doc.css";

function Rating() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const pageSize = 4 ; 
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;

  const getRating = (page) => {
    axiosInstance
      .get(`/ratings/doctor/${currentUser.id}/?p=${page}&page_size=${pageSize}`)
      .then((response) => {
        setData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log("Rating not found for the doctor");
        } else {
          console.error("Error fetching rating:", error);
        }
      });
  };

  useEffect(() => {
    getRating(currentPage);
  }, [currentUser, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="container-fluid" style={{ minHeight: "75vh" }}>
        <div className="row">
          <hr />
          <div className="side col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div style={{ textAlign: "center" }}>
              <i className="bi bi-star" style={{ fontSize: "48px", marginBottom: "20px" }}></i>
              <h2>Patients Feedback</h2>
              <hr />
            </div>
            <div className="text-center">
              {data === undefined || data.length === 0 ? (
                <h3 className="text-center">No ratings yet</h3>
              ) : (
                data.map((revObj, index) => <RatingCardForDoc key={index} revObj={revObj} />)
              )}
            </div>
            <div className="row">
              <Pagination className="mt-3 justify-content-center">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rating;
