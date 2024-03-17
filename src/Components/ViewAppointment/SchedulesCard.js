// src/components/AppointmentsCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SchadulesCard = () => {
  const appointments = useSelector((state => state.combineSchadule.appointments))
  return (
    <Card className='rounded-2 shadow'>
      <Card.Body>
        <div className="p-3 ">
          <div className="d-flex" >
            <span className="fs-5 fw-bold  ">Number :</span>
            <span className="ms-2 fs-5 text-muted"> { }</span>
          </div>
          <div className="d-flex">
            <span className="fs-5 fw-bold ">Day :</span>
            <span className="ms-2 fs-5 text-muted"> { }</span>
          </div>
          <div className="d-flex">
            <span className="fs-5 fw-bold ">Start Time :</span>
            <span className="ms-2 fs-5 text-muted"> { }</span>
          </div>
          <div className="d-flex">
            <span className="fs-5 fw-bold ">End Time :</span>
            <span className="ms-2 fs-5 text-muted"> { }</span>
          </div>
        </div>
        <div className='d-flex'>
          <NavLink to={'/Schadule'} className='btn main-btn text-decoration-none mx-auto position-relative '>My Appointment
            <span class=" position-absolute top-0 start-25 translate-middle badge rounded-pill bg-danger ">{appointments.length}</span>
          </NavLink>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SchadulesCard;
