import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { AiFillBulb } from "react-icons/ai";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { GoStarFill } from "react-icons/go";
import RatingCardForDoc from "../../Pages/Doctors/RatingCardForDoc";
import { FaPlus } from "react-icons/fa6";
import ReviewAdd from "../review/ReviewAdd";
import "./rating_card_for_doc.css";
import { axiosInstance } from "../../Network/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { PiAlarmFill } from "react-icons/pi";
import AppDocCard from "./AppDocCard";
function DoctorCard({ doctor }) {
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  const [norate, setNorate] = useState(true);
  const [appointments, setAppointments] = useState([]);

  const getRating = () => {
    axiosInstance
      .get(`/ratings/doctor/${doctor.user.id}`)
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log("Rating not found for the doctor");
          setData([]);
        } else {
          console.error("Error fetching rating:", error);
        }
      });
  };

  const getAppointments = () => {
    axiosInstance
      .get(`/schedules/all_sch/doctor/${doctor.user.id}`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  };

  const refresh = () => {
    getRating();
    getAppointments();

  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctor, currentUser, add, norate]);

  useEffect(() => {
    if (data.length === 0) {
      setNorate(true);
    } else {
      setNorate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, norate]);
  return (
    <Container className="mt-4">
      <Card className="mt-5 p-3 shadow">
        <Row>
          <Col md={3}>
            <img
              className="rounded-circle shadow border-2"
              id="img"
              src={`http://localhost:8000${doctor.user.img}`}
              alt="person"
              style={{
                width: "100px",
                height: "100px",
                position: "absolute",
                top: "-50px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          </Col>

          <Row className="p-5 my-auto text-center">
            <h3 className="fs-4 text-capitalize">
              <span className="fs-3 sec-color ">Dr. </span>
              {doctor.user.first_name} {doctor.user.last_name}
            </h3>
            <div className="">
              <p className="text-capitalize">
                {doctor.degree ? doctor.degree : "MD"} at{" "}
                {doctor.specialization ? doctor.specialization : "General"}
              </p>
              <p>
                <FontAwesomeIcon
                  style={{ color: "dodgerblue" }}
                  icon={faLocationDot}
                />
                &nbsp; {doctor.area} , {doctor.user.address}
              </p>
            </div>
            <p className="col-12 text-center" style={{ fontSize: ".9rem" }}>
              <span style={{ color: "dodgerblue" }}>
                <FontAwesomeIcon icon={faMoneyBill1Wave} /> &nbsp;{" "}
                {doctor.fees ? doctor.fees : 100} EGP
              </span>
            </p>
            <p className="col-12 text-center" style={{ fontSize: ".9rem" }}>
              <span style={{ color: "dodgerblue" }}>
                <FontAwesomeIcon icon={faPhone} /> &nbsp; {doctor.user.phone}
              </span>
            </p>
            <p className="col-12 text-center">
              {[...Array(parseInt(4))].map((_, index) => (
                <FaStar
                  key={index}
                  color="dodgerblue"
                  className="m-1"
                  size={20}
                />
              ))}
              {[...Array(5 - parseInt(4))].map((_, index) => (
                <CiStar
                  key={index}
                  color="dodgerblue"
                  className="m-1"
                  size={20}
                />
              ))}
            </p>
          </Row>
          {/* ***** appointments section */}
          <hr className="w-75 mx-auto sec-color shadow rounded-5" />
          <div className="text-start sec-color pb-3">
            <PiAlarmFill className="me-2 fs-3" />
            <span className="fs-6 ">Appointments</span>
          </div>
          <div className="text-center mb-2">
            {appointments.length === 0 && (
              <div className="text-center">
                <h5 className="text-muted">No appointments yet</h5>
              </div>
            )}
            <AppDocCard appointments={appointments} />
          </div>
          {/* End  appointments */}
          <hr className="w-75 mx-auto sec-color shadow rounded-5" />
          {/* about sec */}
          <div className="mt-1 p-3 ">
            <div className="text-start sec-color">
              <AiFillBulb className="me-2 fs-3" />
              <span className="fs-6 ">About</span>
            </div>
            <p className="text-start ps-5 pt-2">
              {doctor.bio}
              <br />
            </p>
          </div>
          {/* end about sec */}
          <hr className="w-75 mx-auto sec-color shadow" />

          {/* start rating section */}
          <div className="mt-1 p-3 ">
            <div className="text-start sec-color">
              <GoStarFill className="me-2 fs-3" />
              <span className="fs-6 ">
                Rating & Reviews{" "}
                {currentUser && currentUser.is_patient && (
                  <FaPlus
                    className="add"
                    onClick={() => setAdd(!add)}
                    style={{ cursor: "pointer" }}

                  />
                )}
              </span>
            </div>
            <div className="text-center ">
              {norate && (
                <div className="text-center">
                  <h5 className="text-muted">No reviews yet</h5>
                </div>
              )}

              {Array.isArray(data) && data.map((revObj) => (
                <RatingCardForDoc key={revObj.id} revObj={revObj} refresh={refresh} />
              ))}
            </div>
          </div>
          {/* end rating sec */}
          <hr className="w-75 mx-auto sec-color shadow" />
        </Row>
      </Card>
      {add && <ReviewAdd doctor_id={doctor.user.id} refresh={refresh} />}
    </Container>
  );
}

export default DoctorCard;
