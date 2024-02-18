import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Input } from "../utils/inputs/inputText";
import { Validations } from "../utils/validations/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhoneAlt,
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../SideBar/Sidebar";

const Userprofile = () => {
  const [fname, setFname] = useState({ value: "", isValid: true, message: "" });
  const [lname, setLname] = useState({ value: "", isValid: true, message: "" });
  const [email, setEmail] = useState({ value: "", isValid: true, message: "" });
  const [phone, setPhone] = useState({ value: "", isValid: true, message: "" });
  const [age, setAge] = useState({ value: "", isValid: true, message: "" });
  const [gender, setGender] = useState("male");
  const [area, setArea] = useState({ value: "", isValid: true, message: "" });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUserData) {
      setFname({ ...fname, value: currentUserData.fname });
      setLname({ ...lname, value: currentUserData.lname });
      setEmail({ ...email, value: currentUserData.email });
      setPhone({ ...phone, value: currentUserData.phone });
      setAge({ ...age, value: currentUserData.age });
      setGender(currentUserData.gender);
      setArea({ ...area, value: currentUserData.area });
    }
  }, []);

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  let isValid = true;
  let message = "";

  switch (name) {
    case "fname":
    case "lname":
      // Validate first name and last name
      const nameValidationResult = Validations.nameValid(value);
      isValid = nameValidationResult.isValid;
      message = nameValidationResult.message;
      if (name === "fname") {
        setFname({ ...fname, value, isValid, message });
      } else {
        setLname({ ...lname, value, isValid, message });
      }
      break;
    case "email":
      const emailValidationResult = Validations.emailValid(value);
      isValid = emailValidationResult.isValid;
      message = emailValidationResult.message;
      setEmail({ ...email, value, isValid, message });
      break;
    case "phone":
      const phoneValidationResult = Validations.phoneValid(value);
      isValid = phoneValidationResult.isValid;
      message = phoneValidationResult.message;
      setPhone({ ...phone, value, isValid, message });
      break;
    case "age":
      const ageValidationResult = Validations.ageValid(parseInt(value));
      isValid = ageValidationResult.isValid;
      message = ageValidationResult.message;
      setAge({ ...age, value, isValid, message });
      break;
    case "gender":
      setGender(value);
      break;
    case "area":
      setArea({ ...area, value });
      break;
    default:
      break;
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();


    const isFormValid = validateForm();

    if (isFormValid) {
      const currentUserData = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        phone: phone.value,
        age: age.value,
        gender,
        area: area.value,
      };
      localStorage.setItem("currentUser", JSON.stringify(currentUserData));
      setShowSuccessMessage(true);
    }
  };

  const validateForm = () => {
    let isFormValid = true;


    if (!fname.isValid) {
      isFormValid = false;
    }


    if (!lname.isValid) {
      isFormValid = false;
    }


    if (!email.isValid) {
      isFormValid = false;
    }



    return isFormValid;
  };

  return (
    <div style={{ minHeight: "80vh" }} className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="card bg-light p-4">
            <div className="card-header bg-primary text-light">
              <h3 className="text-center mb-0">Manage Profile</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                  <label
                    htmlFor="fname"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faUser} /> First Name
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      name="fname"
                      value={fname.value}
                      onChange={handleInputChange}
                      isValid={fname.isValid}
                      message={fname.message}
                      className="form-control form-control-blue"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="lname"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faUser} /> Last Name
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      name="lname"
                      value={lname.value}
                      onChange={handleInputChange}
                      isValid={lname.isValid}
                      message={lname.message}
                      className="form-control form-control-blue"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="email"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faEnvelope} /> Email Address
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="email"
                      name="email"
                      value={email.value}
                      onChange={handleInputChange}
                      isValid={email.isValid}
                      message={email.message}
                      className="form-control form-control-blue"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="phone"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faPhoneAlt} /> Phone
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      name="phone"
                      value={phone.value}
                      onChange={handleInputChange}
                      isValid={phone.isValid}
                      message={phone.message}
                      className="form-control form-control-blue"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="age"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} /> Age
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      name="age"
                      value={age.value}
                      onChange={handleInputChange}
                      isValid={age.isValid}
                      message={age.message}
                      className="form-control form-control-blue"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="area"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Area
                  </label>
                  <div className="col-sm-9">
                    <Form.Select
                      value={area.value}
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
                <div className="text-center">
                  <button type="submit" className="btn btn-danger me-2">
                    Save
                  </button>
                  <button type="button" className="btn btn-secondary">
                    Cancel
                  </button>
                </div>

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

export default Userprofile;

