import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import myimage from '../../img/doctor4.jpeg'
function DoctorCard({ doctor }) {
    return (
        <Container>
            <Card className='mt-5'>
            <Row>
                <Col md={2}>
                    <img id='img' src={myimage} alt='person' />
                </Col>
                <Col md={6}>
                    <h3><span className='fs-5'>Doctor </span>{doctor.fname} {doctor.lname}</h3>
                    <p>{doctor.degree} at {doctor.specialization}</p>
                    <p>Area: {doctor.area}</p>
                    
                </Col>
                <Col md={4}>
                    <Button className='btn w-25 m-2 mt-5 sm-3 main-btn'>Booking</Button>
                    <Button className='btn w-25 m-2 mt-5 sm-4 sec-btn'>Details</Button>
                </Col>
            </Row>
            </Card>
        </Container>
    );
}

export default DoctorCard;
