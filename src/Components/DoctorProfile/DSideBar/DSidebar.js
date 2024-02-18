import React from "react";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faCalendarAlt,
  faHospital,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <ListGroup className='list-group listStyle m-3 col'>
    
      <Link
        to="/DoctorProfile"
        className="text-decoration-none"
      >
      <ListGroup.Item className='list-group-item listgroupItem bg-primary text-white'>
      
        <FontAwesomeIcon icon={faUser} /> Profile
      </ListGroup.Item>
        </Link>
        
      <Link
       to="/changedpassword"
        className="text-decoration-none"
      >
      <ListGroup.Item className='list-group-item listgroupItem'>
      
        <FontAwesomeIcon icon={faKey} /> Change Password
        </ListGroup.Item>
      </Link>
      <Link
        to="/manage-branch"
        className="text-decoration-none"
      > 
      <ListGroup.Item className='list-group-item listgroupItem'>
        <FontAwesomeIcon icon={faHospital} /> Manage Branch
        </ListGroup.Item>
      </Link>
      <Link
        to="/schedule"
        className="text-decoration-none"
      >
      <ListGroup.Item className='list-group-item listgroupItem'>
        <FontAwesomeIcon icon={faCalendarAlt} /> Schedule
        </ListGroup.Item>
      </Link>
      <Link
        to="/specialization"
        className="text-decoration-none"
      >
      <ListGroup.Item className='list-group-item listgroupItem'>
        <FontAwesomeIcon icon={faClock} /> Specialization
        </ListGroup.Item>
      </Link>
     </ListGroup>
  );
};

export default Sidebar;

