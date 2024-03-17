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

function DoctorCard({ doctor }) {
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  
  const getRating = () => {
    axiosInstance.get(`/ratings/doctor/${doctor.user.id}`).then((response) => {
      setData(response.data);
    });
  };

  const refresh = () => {
    getRating();
  };


  useEffect(() => {
    axiosInstance.get(`/ratings/doctor/${doctor.user.id}`).then((response) => {
      setData(response.data);
    });
  }, [doctor, add, currentUser]);

  return (
    <Container className="mt-4">
      <Card className="mt-5 p-3 shadow">
        <Row>
          <Col md={3}>
            <img
              className="rounded-circle shadow border-2"
              id="img"
              src={"../../img/" + doctor.Image}
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
                {doctor.degree} at {doctor.specialization}
              </p>
              <p>
                <FontAwesomeIcon
                  style={{ color: "dodgerblue" }}
                  icon={faLocationDot}
                />
                &nbsp; {doctor.area}
              </p>
            </div>
            <p className="col-12 text-center" style={{ fontSize: ".9rem" }}>
              <span style={{ color: "dodgerblue" }}>
                <FontAwesomeIcon icon={faMoneyBill1Wave} /> &nbsp; {doctor.fees}
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
                {currentUser.is_patient && (
                  <FaPlus
                    className="add"
                    onClick={() => setAdd(!add)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </span>
            </div>
            <div className="text-center ">
              {data.map((revObj) => {
                return <RatingCardForDoc revObj={revObj} refresh={refresh} />;
              })}
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
