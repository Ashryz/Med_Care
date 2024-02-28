import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import myimage from "../../img/doctor4.jpeg";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { AiFillBulb } from "react-icons/ai";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { GoStarFill } from "react-icons/go";
import RatingCardForDoc from "./RatingCardForDoc";

import axios from "axios";

function DoctorCard({ doctor }) {
  

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://retoolapi.dev/bGDaxE/feedback")
      .then((response) => {
        const filteredData = response.data.filter((row) => row.doc_id !== null);
        setData(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="mt-4">
      <Card className="mt-5 p-3 shadow">
        <Row>
          <Col md={3}>
            <img
              className="rounded-circle shadow border-2"
              id="img"
              src={myimage}
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
            <h3 className="fs-4 ">
              <span className="fs-3 sec-color">Dr</span>
              {doctor.fname} {doctor.lname}
            </h3>
            <div className="">
              <p className="">
                {doctor.degree} at {doctor.specialization}
              </p>
              <p>
                <FontAwesomeIcon
                  style={{ color: "dodgerblue" }}
                  icon={faLocationDot}
                />
                {doctor.area}
              </p>
            </div>
            <p className="col-12 text-center" style={{ fontSize: ".9rem" }}>
              <span style={{ color: "dodgerblue" }}>
                <FontAwesomeIcon icon={faMoneyBill1Wave} /> {doctor.fees}
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
              loreminpsum loreminpsum loreminpsum loreminpsum doc ahmed
              specialization
            </p>
          </div>
          {/* end about sec */}
          <hr className="w-75 mx-auto sec-color shadow" />
          {/* start rating section */}
          <div className="mt-1 p-3 ">
            <div className="text-start sec-color">
              <GoStarFill className="me-2 fs-3" />
              <span className="fs-6 ">Rating & Reviews</span>
            </div>
            <div className="text-center ps-5 pt-2">
                {data.map((revObj) => {
                    return (
                    <RatingCardForDoc revObj={revObj} />
                    );
                })}
            </div>
          </div>
          {/* end rating sec */}
          <hr className="w-75 mx-auto sec-color shadow" />
        </Row>
      </Card>
    </Container>
  );
}

export default DoctorCard;
