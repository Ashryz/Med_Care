import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function Sidebar() {
  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <div className="sidebar">
            <div className="list-group list-group-flush">
              <>
              <Link to="/report" className="list-group-item">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-file-earmark-text me-2"></i>
                    <span> Report </span>
                  </div>
                </Link>
                <Link to="/appointments" className="list-group-item">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-table me-2"></i>
                    <span> Appointments </span>
                  </div>
                </Link>
                <Link to="/logout" className="list-group-item">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-calendar me-2"></i>
                    <span> Add Schedule </span>
                  </div>
                </Link>
                <Link to="/Profile" className="list-group-item">
                  <div className="d-flex align-items-center">
                  <i className="bi bi-calendar2 me-2"></i>
                    <span>  View Schadule </span>
                  </div>
                </Link>      
                <Link to="/Profile" className="list-group-item">
                  <div className="d-flex align-items-center">
                  <i className="bi bi-star  me-2"></i>
                    <span>  Rating </span>
                  </div>
                </Link>           
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
