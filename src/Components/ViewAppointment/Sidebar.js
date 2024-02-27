// src/components/Sidebar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaCalendar, FaUser, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="flex-column">
      <Navbar.Brand>Doctor Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <Link to="/" className="nav-link">
            <FaCalendar /> Appointments
          </Link>
          <Link to="/profile" className="nav-link">
            <FaUser /> Profile
          </Link>
          <Link to="/admin" className="nav-link">
            <FaCog /> Admin
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Sidebar;
