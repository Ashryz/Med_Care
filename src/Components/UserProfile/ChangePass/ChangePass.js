import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosInstance } from "../../../Network/axiosInstance";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../SideBar/Sidebar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }

    // Perform validation
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "password":
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(value)) {
          errorMessage =
            "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 6 characters long";
        }
        break;
      case "confirmPassword":
        if (value !== password) {
          errorMessage = "Passwords do not match";
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
    // disable the button
    
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
      await axiosInstance.patch(`/auth/users/change-password/${userId}/`, {
        password: password,
      });
      dispatch({
        type: "SET_ALERT",
        payload: {
          strong: "Success!",
          txt: "Password updated successfully",
          type: "success",
        },
      });
      navigate("/");

      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };
  return (
    <div className="container mt-5"
     style={{ minHeight: "50vh" }}
    >
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="card bg-light m-3">
            <div className="card-header prim-pg text-light">
              <h3 className="text-center mb-0">Change Password</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Password Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="password"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faKey} /> Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">
                      {validationErrors.password}
                    </div>
                  </div>
                </div>
                {/* Confirm Password Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faKey} /> Confirm Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">
                      {validationErrors.confirmPassword}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn main-btn me-2">
                    Change Password
                  </button>
                </div>
                {/* Success message */}
                {showSuccessMessage && (
                  <div className="alert alert-success mt-3" role="alert">
                    Password updated successfully!
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

export default ChangePassword;
