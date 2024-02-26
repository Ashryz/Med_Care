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
      <ListGroup.Item className='list-group-item listgroupItem prim-pg text-white'>
      
        <FontAwesomeIcon icon={faUser} /> Profile
      </ListGroup.Item>
        </Link>
        
      <Link
       to="/changedDpassword"
        className="text-decoration-none"
      >
      <ListGroup.Item className='list-group-item listgroupItem prim-color'>
      
        <FontAwesomeIcon icon={faKey} className="sec-color"/> Change Password
        </ListGroup.Item>
      </Link>
  </ListGroup>
  );
};

export default Sidebar;

