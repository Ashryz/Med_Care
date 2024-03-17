import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function Sidebar() {
  return (

    <div className="container-fluid  vh-100 mt-4 ">
      <div className="row rounded-3 shadow py-3 ">
       

          <div className="list-group list-group-flush">
            <>
              <div className="  m-2">
                <Link to="/report" className="list-group-item">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  <span> Report </span>
                </Link>
              </div>
              <div className="  m-2">
                <Link to="/appointments" className="list-group-item">

                  <i className="bi bi-table me-2"></i>
                  <span> Appointments </span>
                </Link>
              </div>
              <div className=" m-2">
                <Link to="/logout" className="list-group-item">

                  <i className="bi bi-calendar me-2"></i>
                  <span> Add Schedule </span>
                </Link>
              </div>

              <div className=" m-2">
                <Link to="/Profile" className="list-group-item">
                  <i className="bi bi-calendar2 me-2"></i>
                  <span>  View Schadule </span>
                </Link>
              </div>
              <div className=" m-2">
                <Link to="/Profile" className="list-group-item">
                  <i className="bi bi-star  me-2"></i>
                  <span>  Rating </span>
                </Link>
              </div>
            </>
          </div>

        </div>
      
    </div>
  );
}

export default Sidebar;
