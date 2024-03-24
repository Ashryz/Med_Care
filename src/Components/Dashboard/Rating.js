import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "./Sidebar";
import "./style.css";
import { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../Network/axiosInstance";
import { AuthContext } from "../../context/AuthContext";

import RatingCardForDoc from "../../Pages/Doctors/RatingCardForDoc";

import "../Doctors/rating_card_for_doc.css";

function Rating() {
  const [data, setData] = useState([]);
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;

  const getRating = () => {
    axiosInstance
      .get(`/ratings/doctor/${currentUser.id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error here
          console.log("Rating not found for the doctor");
          // You can set data to some default value or handle the error in another way
        } else {
          // Handle other errors
          console.error("Error fetching rating:", error);
        }
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/ratings/doctor/${currentUser.id}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error here
          console.log("Rating not found for the doctor");
          // You can set data to some default value or handle the error in another way
        } else {
          // Handle other errors
          console.error("Error fetching rating:", error);
        }
      });
  }, [currentUser, data.length]);

  return (
    <>
      <div className="App" style={{ minHeight: "42.1vh" }}>
        <div className="container-fluid">
          <div className="row">
            <hr />
            <div className="side col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div style={{ textAlign: "center" }}>
                <i
                  className="bi bi-star"
                  style={{ fontSize: "48px", marginBottom: "20px" }}
                ></i>
                <h2>Patients Feedback</h2>
                <hr />
              </div>
              <div className="text-center">
                {data === undefined || data.length === 0 ? (
                  <h3 className="text-center ">No ratings yet</h3>
                ) : (
                  data.map((revObj, index) => (
                    <RatingCardForDoc revObj={revObj} />
                   
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rating;
