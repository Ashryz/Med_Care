import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosInstance } from "../../../Network/axiosInstance";
import {
  faInfoCircle,
  faMapMarkerAlt,
  faDollarSign,
  faGraduationCap,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import DSidebar from "../DSideBar/DSidebar";


const AdditionalInfo = () => {
  const [userData, setUserData] = useState({
    area: "",
    specialization: "",
    fees: "",
    bio: "",
    degree: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    area: "",
    specialization: "",
    fees: "",
    bio: "",
    degree: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Get user ID from local storage
      const response = await axiosInstance.get(`/auth/users/${userId}/`); // Fetch user data by user ID
      const { area, specialization, fees, bio, degree } = response.data;
      setUserData({ area, specialization, fees, bio, degree });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));

    // Perform validation
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";
    switch (name) {
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
    const isValid = Object.values(validationErrors).every((error) => error === "");
    if (!isValid) {
      console.error("Form has validation errors");
      return;
    }

    try {
      const userId = localStorage.getItem("userId"); // Get user ID from local storage
      await axiosInstance.patch(`/auth/users/${userId}/`, userData); // Update user data by user ID
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
             <div className="col-md-3">
          <DSidebar />
        </div>
        <div className="col-md-9 mx-auto">
          <div className="card bg-light m-3">
            <div className="card-header prim-pg text-light">
              <h3 className="text-center mb-0">Manage Profile</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Area Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="area"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Area
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="area"
                      value={userData.area}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.area}</div>
                  </div>
                </div>
                {/* Specialization Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="specialization"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faGraduationCap} /> Specialization
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="specialization"
                      value={userData.specialization}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.specialization}</div>
                  </div>
                </div>
                {/* Fees Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="fees"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faDollarSign} /> Fees
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="fees"
                      value={userData.fees}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.fees}</div>
                  </div>
                </div>
                {/* Bio Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="bio"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} /> Bio
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      name="bio"
                      value={userData.bio}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.bio}</div>
                  </div>
                </div>
                {/* Degree Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="degree"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faBrain} /> Degree
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="degree"
                      value={userData.degree}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.degree}</div>
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
    </div>
  );
};

export default AdditionalInfo;

