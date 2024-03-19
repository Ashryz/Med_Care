import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XYPlot, VerticalBarSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, ChartLabel } from 'react-vis';
import 'react-vis/dist/style.css';
import Sidebar from './Sidebar';
import './style.css';

const MainDashboard = () => {
    const DashboardCard = ({ title, number, chartData }) => {
    return (
      <div className="col-md-4">
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{number}</p>
          </div>
        </div>
      </div>
    );
  };
 
  return (
    <div className="App" >
      <div className="container-fluid">
        <div className="row">
          <hr />
          <div className="side col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9 mt-6">
            <div className="  rounded p-3">
              <div
                className="prim-pg text-center text-white p-1"
                style={{ borderRadius: "11px 11px 0px 0px" }} >
                <i className="bi bi-file-earmark-text" style={{ fontSize: "20px", marginRight: "15px", marginTop: "10px" }}></i>
                <span style={{ marginTop: "15px" }}> Report </span>
              </div>
              <div className="row mt-4">
                <DashboardCard title="Number of Appointments" number={10} />
                <DashboardCard title="Total Reviews" number={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
