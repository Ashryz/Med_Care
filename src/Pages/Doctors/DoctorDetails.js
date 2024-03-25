import React from "react";
import { useParams } from "react-router-dom";
import DoctorCard from "../../Components/Doctors/DoctorCard";
import { Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaHourglassStart } from "react-icons/fa";
import { axiosInstance } from "../../Network/axiosInstance";

function DoctorDetails() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/doctors/doctor/${id}`)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error here
          console.log("Doctor not found");
          // You can set doctor state to null or handle the error in another way
        } else {
          // Handle other errors
          console.error("Error fetching doctor:", error);
        }
      });
  }, [id]);

  if (!doctor) {
    return (
      <div
        className="contanier text-center animate__animated animate__flash  mt-5"
        style={{ minHeight: "30vh" }}
      >
        <FaHourglassStart size={100} className="sec-color" />
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <DoctorCard doctor={doctor} />
      </Row>
    </Container>
  );
}

export default DoctorDetails;
