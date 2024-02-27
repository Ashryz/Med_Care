import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "../SideBar/Sidebar";

const MyInsurance = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <ListGroup className="cardheadlistStyle m-3">
            <ListGroup.Item className="cardhead prim-pg listgroupItem">
              <div className="card-header prim-pg text-light">
                <h4 className="text-center mb-0">
                  <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                  My Insurance
                </h4>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className='list-group-item listgroupItem'>
              <p className="text-center">
                Add your insurance to automatically process orders that your insurance company covers.
              </p>
            </ListGroup.Item>

            <ListGroup.Item className='list-group-item listgroupItem text-center'>
              <button className="btn main-btn">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add Insurance
              </button>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default MyInsurance;

