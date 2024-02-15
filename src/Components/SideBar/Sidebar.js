import { Link } from 'react-router-dom';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { faIconName } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <ListGroup className='list-group listStyle m-3 col'>
        <Link className="text-decoration-none rounded-top" to="/Userprofile">

        <ListGroup.Item className='list-group-item listgroupItem bg-primary text-white'>
          <FontAwesomeIcon icon={faUser} className="me-2" />
          <span className='spanStyle'>Profile</span>
        </ListGroup.Item>
        </Link>
       <Link className="text-decoration-none" to="/changepassword">
        <ListGroup.Item className='list-group-item listgroupItem'>
          <FontAwesomeIcon icon={faLock} className="me-2" />
          <span className='spanStyle'>Change Password</span>
        </ListGroup.Item>
      </Link>


        <ListGroup.Item className='list-group-item listgroupItem'>
          <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
          <span className='spanStyle'>My Insurance</span>
        </ListGroup.Item>

    </ListGroup>
  );
}

export default Sidebar;

