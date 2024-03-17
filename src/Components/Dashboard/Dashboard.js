import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MainDashboard from './Report';
import Appointments from './Appointments';
import Logout from './Logout';
import Sidebar from './Sidebar';
import Profile from './Profile';
import HomeDash from './HomeDash';
import './style.css';
import Report from './Report';

function Dashboard() {
  return (
    <>
        <div className="App">
          <div className="container-fluid">
            <div className="row">
            <hr/>
            <h2 className="text-center text-muted">Doctor Dashboard</h2>
            <hr/>
            
              <div className="side col-md-2">
                <Sidebar />
              </div>
              <div className="col-md-10">

                <Routes> 
                  <Route path="/" element={<HomeDash />} /> 
                  <Route path="/Dashboard/report" element={<Report />} />
                  <Route path="/appointments" element={<Appointments />} /> 
                  <Route path="/Add Schedule" element={<Logout/>} /> 
                  <Route path="/profile" element={<Profile />} /> 
                </Routes> 
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Dashboard;
