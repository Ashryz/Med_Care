import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import { Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

function DoctorDetails(){

    const  {id}  = useParams();
    console.log('=============================')
    console.log(id)
    console.log('=============================')
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        axios.get(`https://retoolapi.dev/46yPXc/doctors/${id}`)
        .then((res) => {
            // console.log(res.data)
            console.log(`https://retoolapi.dev/46yPXc/doctors/${id}`)
            setDoctor(res.data)})
        .catch((err) => console.log(err))
    },[id])

    if (!doctor) {
        return <div>Loading...</div>;
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
