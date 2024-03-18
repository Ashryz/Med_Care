import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import './style.css';


function Dashboard() {
  return (
    <>
      <div className="App" style={{ minHeight: '75vh' }}>
        <div className="container-fluid">
          <div className="row">
            <hr />
            <div className="side col-md-3 h-100 ">
              <Sidebar />
              
            </div>
            <div className="col-md-9">
              <div style={{ textAlign: 'center' }}>
                <i className="bi bi-speedometer2" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
                <h1>Welcome to your Dashboard</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
