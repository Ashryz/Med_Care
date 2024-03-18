import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import './style.css';



function Rating() {
  return (
    <>
      <div className="App" style={{ minHeight: '75vh' }}>
        <div className="container-fluid">
          <div className="row">
            <hr />
            <div className="side col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div style={{ textAlign: 'center' }}>
                <i className="bi bi-speedometer2" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
                <h2>Patients Feedback</h2>
               
              </div>
              <div className="bg-danger">
                sadsad
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rating;