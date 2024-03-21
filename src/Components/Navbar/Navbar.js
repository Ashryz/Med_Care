import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { themesAction } from "../../Store/Actions/Actions";
import { AuthContext } from "../../context/AuthContext";

function NavbarComp() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = authContext.isLoggedIn;
  const currentUser = authContext.currentUser;
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(themesAction(myTheme === "light" ? "dark" : "light"));
  };
  const myTheme = useSelector((state) => state.combineThemes.theme);

  useEffect(() => {
    setShowDropdown(false);
  }, [isLoggedIn, currentUser]);

  const handleLogout = () => {
    authContext.logout();
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <Navbar expand="lg" bg="primary" id="nv-bar" className="">
      <Container fluid>
        <Navbar.Brand
          className="fw-bold fs-2 text-white p-0"
          style={{ minWidth: "10rem" }}
        >
          <Link className="text-decoration-none text-white" to="/">
            <i className="bi bi-hospital"></i> MED-CARE{" "}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav>
            <Nav.Link
              as={Link}
              to="/contact"
              className="text-decoration-none text-white fw-bold fs-5 me-2 nv-hover"
            >
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center ms-lg-5">
            <InputGroup>
              <Form.Control
                placeholder="Search for Doctor's Name"
                aria-label="Doctor's Name"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-0"
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
          {isLoggedIn && (
            <div className="d-flex align-items-center ms-lg-5 justify-content-center ">
              <img
                src={
                  currentUser.img
                    ? `http://localhost:8000${currentUser.img}`
                    : `http://127.0.0.1:8000//media/profile_images/profile.jpeg`
                }
                style={{
                  width: "2.8rem",
                  border: "3px solid #FFF8DC",
                  objectFit: "cover",
                }}
                className="rounded-circle me-2 shadow p-0"
                alt="user"
              />
              <Link
                to={currentUser.is_doctor ? "/DoctorProfile" : "/Userprofile"}
                className="text-dark text-decoration-none me-2 fs-5 fw-bold text-white nv-hover text-capitalize"
              >
                {currentUser.first_name}
              </Link>
            </div>
          )}
          <Nav className="ms-auto g-2">
            {!isLoggedIn ? (
              <div className="d-flex flex-sm-column justify-content-center align-items-center flex-md-row">
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
                <Nav.Link
                  variant="outline-light"
                  onClick={handleLogout}
                  className="fw-bold fs-5 text-white nv-hover text-center me-2 align-content-center"
                >
                  LOGOUT
                </Nav.Link>
              </>
            )}
            <Nav.Link
              variant="outline-light"
              onClick={() => toggleDarkMode(myTheme)}
              className="me-2 text-white fs-5 align-content-center m-sm-auto m-md-auto m-lg-auto m-xl-auto m-xxl-auto"
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
