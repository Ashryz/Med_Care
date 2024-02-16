import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css'
function NavbarComp() {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
        setShowDropdown(false);
      }, []);

      const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        history.push("/");
      };

  return (
    <Navbar expand="lg" bg='primary' id='nv-bar'>
      <Container>
        <Navbar.Brand className='fw-bold fs-2 text-white'><i className="bi bi-hospital"></i> MED-CARE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="text-decoration-none text-white fw-bold fs-5">Home</Nav.Link>
          </Nav>
          <Nav className='ms-auto g-2'>
            <Button variant="outline-light" onClick={toggleDarkMode} className='me-2'>
                {isDarkMode ? (
                    <i className="bi bi-moon-fill"></i>
                ) : (
                    <i className="bi bi-moon"></i>
                )}
            </Button>
            <Dropdown className='me-2 fw-bold'>
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    English
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Option 1">Arabic</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          {!isLoggedIn && (
              <>
                <Link to="/login"><Button variant="outline-light" className='me-2 fw-bold'><i className="bi bi-box-arrow-in-right fw-bold"></i> Login</Button>{' '}</Link>
                <Link to="/SelectReg"><Button variant="outline-light" className='me-2 fw-bold'><i className="bi bi-person-fill fw-bold"></i> Register</Button>{' '}</Link>
              </>
            )}
           {isLoggedIn && (
             <Dropdown onClick={() => setShowDropdown(!showDropdown)}>
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    User Name
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Option 1"> Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="Option 2" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Logout </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;