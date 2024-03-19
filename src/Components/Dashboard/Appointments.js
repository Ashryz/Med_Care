import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import './style.css';
import { ViewAppointment } from '../../Pages/ViewAppointment/ViewAppointment';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Appointments() {
  const appointments = useSelector((state => state.combineSchadule.appointments))
  return (
    <>
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <hr />
            <div className="side col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9 mt-3">
              <h1 className="text-center d-inline-block text-capitalize col-8">View Appointments</h1>
              <div className='d-inline-block '>
               
                <NavLink to={'/Schadule'} className='btn main-btn text-decoration-none mx-auto position-relative '>My Appointment
                  <span class=" position-absolute top-0 start-25 translate-middle badge rounded-pill bg-danger ">{appointments.length}</span>
                </NavLink>
              
              </div>
              <ViewAppointment />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointments;
