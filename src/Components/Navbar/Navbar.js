import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css'
function NavbarComp() {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
        setCurrentUser(JSON.parse(localStorage.getItem('currentUser')) || {})
        setShowDropdown(false);
      }, []);

      const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        navigate("/");
      };

  return (
    <Navbar expand="lg" bg='primary' id='nv-bar'  >
      <Container>
        <Navbar.Brand className='fw-bold fs-2 text-white'><Link className='text-decoration-none text-white' to="/"><i className="bi bi-hospital"></i> MED-CARE </Link></Navbar.Brand>
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
                <Link to="/SignIn"><Button variant="outline-light" className='me-2 fw-bold'><i className="bi bi-box-arrow-in-right fw-bold"></i> Login</Button>{' '}</Link>
                <Link to="/SignUp"><Button variant="outline-light" className='me-2 fw-bold'><i className="bi bi-person-fill fw-bold"></i> Register</Button>{' '}</Link>
              </>
            )}
           {isLoggedIn && (
             <Dropdown onClick={() => setShowDropdown(!showDropdown)}>
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    User Name
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Option 1">
                    <Link
                      to={currentUser.type === 'doctor' ? "/DoctorProfile" : "/Userprofile"}
                      className="text-dark text-decoration-none"
                    >
                      Profile
                    </Link>
                    </Dropdown.Item>
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