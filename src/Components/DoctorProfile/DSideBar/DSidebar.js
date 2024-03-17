import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <ListGroup className="list-group listStyle m-3 col border">
      <Link to="/DoctorProfile" className="text-decoration-none rounded-top">
        <ListGroup.Item className="list-group-item listgroupItem prim-pg text-white ">
          <FontAwesomeIcon icon={faUser} /> Profile
        </ListGroup.Item>
      </Link>

      <Link to="/changedDpassword" className="text-decoration-none">
        <ListGroup.Item className="list-group-item listgroupItem prim-color">
          <FontAwesomeIcon icon={faKey} className="me-2" /> Change Password
        </ListGroup.Item>
      </Link>

      <Link to="/additionalinfo" className="text-decoration-none">
        <ListGroup.Item className="list-group-item listgroupItem prim-color">
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" /> Additional
          Information
        </ListGroup.Item>
      </Link>
    </ListGroup>
  );
};

export default Sidebar;
