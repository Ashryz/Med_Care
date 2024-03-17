import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import './style.css';
import { ViewAppointment } from '../../Pages/ViewAppointment/ViewAppointment';

function Appointments() {
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
              {/* <div style={{ textAlign: 'center' }}>
                <i className="bi bi-speedometer2" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
                <h1>Welcome to your Appointments</h1>
              </div> */}
              <ViewAppointment/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointments;
