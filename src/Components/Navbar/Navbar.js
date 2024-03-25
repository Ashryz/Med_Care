import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { themesAction } from "../../Store/Actions/Actions";
import { AuthContext } from "../../context/AuthContext";

function NavbarComp() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = authContext.isLoggedIn;
  const currentUser = authContext.currentUser;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(themesAction(myTheme === "light" ? "dark" : "light"));
  };
  const myTheme = useSelector((state) => state.combineThemes.theme);

  const handleLogout = () => {
    authContext.logout();
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <Navbar expand="lg" bg="primary" id="nv-bar">
      <Container fluid>
        <Navbar.Brand
          className="fw-bold fs-2 text-white"
          style={{ minWidth: "10rem" }}
        >
          <Link className="text-decoration-none text-white" to="/">
            <i className="bi bi-hospital"></i> MED-CARE{" "}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link
              as={Link}
              to="/contact"
              className="text-decoration-none text-white fw-bold fs-5 me-2 nv-hover"
            >
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav className="ms-lg-5 mb-sm-2">
            <InputGroup>
              <Form.Control
                placeholder="Search for Doctor's Name"
                aria-label="Doctor's Name"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="outline-light"
                id="button-addon2"
                onClick={handleSearch}
              >
                Search
              </Button>
            </InputGroup>
          </Nav>
          <Nav className="ms-auto g-2">
            {!isLoggedIn ? (
              <div className="d-flex justify-content-center align-items-center ">
                <Link
                  to="/SignIn"
                  variant="outline-light"
                  className="me-3 fw-bold fs-5 text-white text-decoration-none nv-hover"
                >
                  LOGIN
                </Link>
                <Link
                  to="/SignUp"
                  variant="outline-light"
                  className="me-2 fw-bold fs-5 text-white text-decoration-none nv-hover"
                >
                  REGISTER
                </Link>
              </div>
            ) : (
              <>
                <div className="d-flex align-items-center">
                  <img
                    src={
                      currentUser.img
                        ? `http://localhost:8000${currentUser.img}`
                        : `http://127.0.0.1:8000//media/profile_images/profile.jpeg`
                    }
                    style={{ width: "2rem" }}
                    className="rounded-circle me-2"
                    alt="profile"
                  />
                  
                  <Link
                    to={
                      currentUser.is_doctor ? "/DoctorProfile" : "/Userprofile"
                    }
                    className="text-dark text-decoration-none me-2 fs-5 fw-bold text-white nv-hover"
                  >
                    {currentUser.first_name}
                  </Link>
                </div>
                <Nav.Link
                  variant="outline-light"
                  onClick={handleLogout}
                  className="fw-bold fs-5 text-white nv-hover"
                >
                  LOGOUT
                </Nav.Link>
              </>
            )}
            <Nav.Link
              variant="outline-light"
              onClick={() => toggleDarkMode(myTheme)}
              className="me-2 text-white fs-5"
              style={{ maxWidth: "80px" }}
            >
              {isDarkMode ? (
                <i className="bi bi-moon-fill"></i>
              ) : (
                <i className="bi bi-moon"></i>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
