import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DoctorCard from "../../Components/Doctors/DoctorCard";
import { Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaHourglassStart } from "react-icons/fa";

function DoctorDetails() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios
      .get(`https://retoolapi.dev/46yPXc/doctors/1`)
      .then((res) => {
        // console.log(res.data)
        setDoctor(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!doctor) {
    return (
      <div className="text-center animate__animated animate__flash  mt-5">
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
