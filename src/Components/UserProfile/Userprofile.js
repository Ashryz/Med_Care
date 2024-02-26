
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhoneAlt,
  faCalendarAlt,
  faMapMarkerAlt,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";


import Sidebar from "./SideBar/Sidebar";


import { Validations } from "../utils/validations/validation";

const Userprofile = () => {
  
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    age: "",
    area: "",
    Image: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null); 

  // Validation state variables
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [ageError, setAgeError] = useState("");

  useEffect(() => {
    
    fetchUserData();
  }, []);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://retoolapi.dev/VcvvU9/Userprofile");
      if (response.data.length > 0) {
        const currentUserData = response.data[2];
        setUserData(currentUserData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to handle profile picture deletion
  const handleDeleteProfilePicture = () => {
    // Clear profile picture from state
    setUserData((prevUserData) => ({
      ...prevUserData,
      Image: "",
    }));
    // Close modal
    setShowModal(false);
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));

    // Perform validation on input change
    if (name === "fname") {
      setFnameError(Validations.nameValid(value).message);
    } else if (name === "lname") {
      setLnameError(Validations.nameValid(value).message);
    } else if (name === "email") {
      setEmailError(Validations.emailValid(value).message);
    } else if (name === "phone") {
      setPhoneError(Validations.phoneValid(value).message);
    } else if (name === "age") {
      setAgeError(Validations.ageValid(value).message);
    }
  };

  // Function to handle choosing profile picture
  const handleChooseProfilePicture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
      setShowModal(false); // Close modal after clicking "Choose Profile Picture"
    }
  };

  // Function to handle modal closure
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserData((prevUserData) => ({
      ...prevUserData,
      Image: file.name,
    }));
    setShowModal(false); // Close modal after choosing profile picture
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation before submitting
    const fnameValidation = Validations.nameValid(userData.fname);
    const lnameValidation = Validations.nameValid(userData.lname);
    const emailValidation = Validations.emailValid(userData.email);
    const phoneValidation = Validations.phoneValid(userData.phone);
    const ageValidation = Validations.ageValid(userData.age);

    // Set validation errors if any
    setFnameError(fnameValidation.message);
    setLnameError(lnameValidation.message);
    setEmailError(emailValidation.message);
    setPhoneError(phoneValidation.message);
    setAgeError(ageValidation.message);

    // If all validations pass, proceed with form submission
    if (
      fnameValidation.isValid &&
      lnameValidation.isValid &&
      emailValidation.isValid &&
      phoneValidation.isValid &&
      ageValidation.isValid
    ) {
      try {
        const existingUserResponse = await axios.get("https://retoolapi.dev/VcvvU9/Userprofile");
        const existingUser = existingUserResponse.data.length > 0;

        const method = existingUser ? "put" : "post";
        const url = existingUser
          ? `https://retoolapi.dev/VcvvU9/Userprofile/${existingUserResponse.data[2].id}`
          : "https://retoolapi.dev/VcvvU9/Userprofile";

        await axios[method](url, userData);

        setShowSuccessMessage(true);
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
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
                  <label htmlFor="Image" className="form-label col-12 text-center">
                    <div className="position-relative">
                      <img
                        src={userData.Image ? userData.Image : "/profile.jpeg"}
                        alt="User"
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
                        className="position-absolute top-50 start-50 translate-middle text-primary"
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
                {/* First Name Input */}
                <div className="mb-3 row">
                  <label htmlFor="fname" className="form-label col-sm-3 text-primary">
                    <FontAwesomeIcon icon={faUser} /> First Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="fname"
                      value={userData.fname}
                      onChange={handleInputChange}
                      className={`form-control form-control-blue ${fnameError && "is-invalid"}`}
                    />
                    {fnameError && <div className="invalid-feedback">{fnameError}</div>}
                  </div>
                </div>
                {/* Last Name Input */}
                <div className="mb-3 row">
                  <label htmlFor="lname" className="form-label col-sm-3 text-primary">
                    <FontAwesomeIcon icon={faUser} /> Last Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="lname"
                      value={userData.lname}
                      onChange={handleInputChange}
                      className={`form-control form-control-blue ${lnameError && "is-invalid"}`}
                    />
                    {lnameError && <div className="invalid-feedback">{lnameError}</div>}
                  </div>
                </div>
                {/* Email Input */}
                <div className="mb-3 row">
                  <label htmlFor="email" className="form-label col-sm-3 text-primary">
                    <FontAwesomeIcon icon={faEnvelope} /> Email Address
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className={`form-control form-control-blue ${emailError && "is-invalid"}`}
                    />
                    {emailError && <div className="invalid-feedback">{emailError}</div>}
                  </div>
                </div>
                {/* Phone Input */}
                <div className="mb-3 row">
                  <label htmlFor="phone" className="form-label col-sm-3 text-primary">
                    <FontAwesomeIcon icon={faPhoneAlt} /> Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className={`form-control form-control-blue ${phoneError && "is-invalid"}`}
                    />
                    {phoneError && <div className="invalid-feedback">{phoneError}</div>}
                  </div>
                </div>
                {/* Age Input */}
                <div className="mb-3 row">
                  <label htmlFor="age" className="form-label col-sm-3 text-primary">
                    <FontAwesomeIcon icon={faCalendarAlt} /> Age
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="age"
                      value={userData.age}
                      onChange={handleInputChange}
                      className={`form-control form-control-blue ${ageError && "is-invalid"}`}
                    />
                    {ageError && <div className="invalid-feedback">{ageError}</div>}
                  </div>
                </div>
                {/* Area Input */}
                <div className="mb-3 row">
                  <label htmlFor="area" className="form-label col-sm-3 text-primary">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Area
                  </label>
                  <div className="col-sm-9">
                    <Form.Select
                      value={userData.area}
                      name="area"
                      onChange={handleInputChange}
                      className="form-select form-control-blue"
                    >
                      <option value="">Select Area</option>
                      <option value="Cairo">Cairo</option>
                      <option value="Aswan">Aswan</option>
                      <option value="Nasr City">Nasr City</option>
                      <option value="Bani Suef">Bani Suef</option>
                      <option value="Giza">Giza</option>
                      <option value="Alexandria">Alexandria</option>
                    </Form.Select>
                  </div>
                </div>
                {/* Submit button */}
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

      {/* Profile Picture Options Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Profile Picture Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            {/* Display the profile picture */}
            {userData.Image && (
              <img
                src={userData.Image}
                alt="Profile"
                className="img-fluid rounded"
                style={{ maxHeight: "400px" }}
              />
            )}
            {/* Display a message if no profile picture is available */}
            {!userData.Image && <p>No profile picture available</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
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

export default Userprofile;

