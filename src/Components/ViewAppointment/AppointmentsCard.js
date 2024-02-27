// src/components/AppointmentsCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { FaCalendar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppointmentsCard = () => {
  const appointments = useSelector((state => state.combineSchadule.appointments))
  return (
    <Card>
      <Card.Body>
        <FaCalendar size={50} color="#007bff" />
        <Card.Text>Total Appointments</Card.Text>
        <div className='d-flex'>
        <NavLink to={'/Schadule'} className='btn main-btn text-decoration-none mx-auto position-relative '>My Schadule
        <span class=" position-absolute top-0 start-25 translate-middle badge rounded-pill bg-danger ">{appointments.length}</span>
        </NavLink>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AppointmentsCard;
