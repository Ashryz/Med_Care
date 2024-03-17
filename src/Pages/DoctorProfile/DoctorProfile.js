import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosInstance } from "../../Network/axiosInstance";
import {
  faUser,
  faEnvelope,
  faPhoneAlt,
  faCalendarAlt,
  faMapMarkerAlt,
  faDollarSign,
  faGraduationCap,
  faBrain,
  faCamera,
  faInfoCircle,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import DSidebar from "../../Components/DoctorProfile/DSideBar/DSidebar";
import { Validations } from "../../Components/utils/validations/validation";

const DoctorProfile = () => {
  const [doctorData, setDoctorData] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    age: "",
    area: "",
    fees: "",
    specialization: "",
    degree: "",
    Image: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    age: "",
    area: "",
    fees: "",
    specialization: "",
    degree: "",
  });

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const fetchDoctorData = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const response = await axiosInstance.get(`/auth/users/${userId}/`);
      const {
        username,
        email,
        phone,
        age,
        gender,
        area,
        fees,
        specialization,
        degree,
        first_name,
        last_name,
      } = response.data;
      setDoctorData({
        username,
        email,
        phone,
        age,
        gender,
        area,
        fees,
        specialization,
        degree,
        fname: first_name,
        lname: last_name,
      });
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  const handleChooseProfilePicture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
      setShowModal(false); // Close modal after clicking "Choose Profile Picture"
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctorData((prevDoctorData) => ({
      ...prevDoctorData,
      Image: file.name,
    }));
    setShowModal(false); // Close modal after choosing profile picture
  };

  const handleDeleteProfilePicture = () => {
    setDoctorData((prevDoctorData) => ({
      ...prevDoctorData,
      Image: "",
    }));
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prevDoctorData) => ({
      ...prevDoctorData,
      [name]: value,
    }));

    // Perform validation
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "fname":
      case "lname":
      case "username":
        errorMessage = Validations.nameValid(value).message;
        break;
      case "email":
        errorMessage = Validations.emailValid(value).message;
        break;
      case "phone":
        errorMessage = Validations.phoneValid(value).message;
        break;
      case "age":
        errorMessage = Validations.ageValid(value).message;
        break;
      case "fees":
        if (value <= 200) {
          errorMessage = "Fees must be greater than 200";
        }
        break;
      default:
        break;
    }
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if there are any validation errors
    const isValid = Object.values(validationErrors).every(
      (error) => error === ""
    );
    if (!isValid) {
      console.error("Form has validation errors");
      return;
    }
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id;

      const updatedUserData = {
        username: doctorData.username,
        first_name: doctorData.fname,
        last_name: doctorData.lname,
        email: doctorData.email,
        phone: doctorData.phone,
        age: doctorData.age,
        city: doctorData.area,
        Image: doctorData.Image,
        gender: doctorData.gender,
      };

      await axiosInstance.patch(`/auth/users/${userId}/`, updatedUserData);

      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error saving doctor data:", error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row ">
        <div className="col-md-3">
          <DSidebar />
        </div>
        <div className="col-md-9">
          <div className="card bg-light m-3">
            <div className="card-header prim-pg text-light">
              <h3 className="text-center mb-0">Manage Profile</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Image Input */}
                <div className="mb-3 row justify-content-center align-items-center">
                  <label
                    htmlFor="Image"
                    className="form-label col-12 text-center"
                  >
                    <div className="position-relative">
                      <img
                        src={
                          +doctorData.Image
                            ? doctorData.Image
                            : "img/profile.jpeg"
                        }
                        alt="Doctor"
                        className="rounded-circle img-thumbnail"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowModal(true)}
                      />
                      <FontAwesomeIcon
                        icon={faCamera}
                        className="position-absolute top-50 start-10 translate-middle text-primary"
                        style={{ fontSize: "24px", cursor: "pointer" }}
                        onClick={() => setShowModal(true)}
                      />
                    </div>
                  </label>
                  <input
                    type="file"
                    id="Image"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="d-none"
                    accept="image/*"
                  />
                </div>
                {/* Username Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="username"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faUser} /> Username
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="username"
                      value={doctorData.username}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">
                      {validationErrors.username}
                    </div>
                  </div>
                </div>
                {/* First Name Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="fname"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faUser} /> First Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="fname"
                      value={doctorData.fname}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.fname}</div>
                  </div>
                </div>
                {/* Last Name Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="lname"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faUser} /> Last Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="lname"
                      value={doctorData.lname}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.lname}</div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="email"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faEnvelope} /> Email Address
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      name="email"
                      value={doctorData.email}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.email}</div>
                  </div>
                </div>
                {/* Phone Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="phone"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faPhoneAlt} /> Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="phone"
                      value={doctorData.phone}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.phone}</div>
                  </div>
                </div>
                {/* Age Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="age"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} /> Age
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="age"
                      value={doctorData.age}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.age}</div>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="gender"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faVenusMars} /> Gender
                  </label>
                  <div className="col-sm-9">
                    <Form.Select
                      value={doctorData.gender}
                      name="gender"
                      onChange={handleInputChange}
                      className="form-select form-control-blue"
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </Form.Select>
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn main-btn me-2">
                    Save
                  </button>
                  <button type="button" className="btn sec-btn">
                    Cancel
                  </button>
                </div>
                {/* Success message */}
                {showSuccessMessage && (
                  <div className="alert alert-success mt-3" role="alert">
                    Profile updated successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header className="bg-white" closeButton>
          <Modal.Title>Profile Picture Options</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <div className="text-center">
            {/* Display the profile picture */}
            {doctorData.Image && (
              <img
                src={doctorData.Image}
                alt="Profile"
                className="img-fluid rounded"
                style={{ maxHeight: "400px" }}
              />
            )}
            {/* Display a message if no profile picture is available */}
            {!doctorData.Image && <p>No profile picture available</p>}
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-white">
          <Button variant="danger" onClick={handleDeleteProfilePicture}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleChooseProfilePicture}>
            Choose Profile Picture
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorProfile;
