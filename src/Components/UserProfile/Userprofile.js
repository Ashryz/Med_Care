import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Input } from "../utils/inputs/inputText";
import AlertNew from "../utils/alert/alertNew";
import { Validations } from "../utils/validations/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIconName } from '@fortawesome/free-solid-svg-icons';

import Sidebar from "../SideBar/Sidebar";

import {
  faUser,
  faEnvelope,
  faPhoneAlt,
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Userprofile = () => {
  const dummyData = {
    firstName: "Israa",
    lastName: "Lotfy",
    userName: "israa@24",
    email: "serr24a@gmail.com",
    mobileNumber: "01020336754",
    age: "22",
    birthDate: "1990-02-06",
    area: "Bani Suef",
  };

  const getStoredData = () => {
    const storedData = localStorage.getItem("formData");
    return storedData
      ? JSON.parse(storedData)
      : {
          firstName: "Israa",
          lastName: "Lotfy",
          userName: "israa@24",
          email: "serra@gmail.com",
          mobileNumber: "01020336754",
          age: "22",
          birthDate: "1990-02-06",
          area: "Bani Suef",
        };
  };

  const [formData, setFormData] = useState(getStoredData);
  const [validationMessages, setValidationMessages] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    mobileNumber: "",
    age: "",
    birthDate: "",
    area: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValidation = Validations.emailValid(formData.email);
    const mobileValidation = Validations.phoneValid(formData.mobileNumber);
    const ageValidation = Validations.ageValid(formData.age);
    const usernameValidation = Validations.nameValid(formData.username);
    const firstNameValidation = Validations.nameValid(formData.firstName);
    const lastNameValidation = Validations.nameValid(formData.lastName);

    setValidationMessages({
      email: emailValidation.message,
      mobileNumber: mobileValidation.message,
      age: ageValidation.message,
      username: usernameValidation.message,
      firstName: firstNameValidation.message,
      lastName: lastNameValidation.message,
      birthDate: "",
      area: "",
    });

    if (
      emailValidation.isValid &&
      mobileValidation.isValid &&
      ageValidation.isValid &&
      usernameValidation.isValid &&
      firstNameValidation.isValid &&
      lastNameValidation.isValid
    ) {
      setValidationMessages({
        email: "",
        mobileNumber: "",
        age: "",
        username: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        area: "",
      });

      setShowSuccessMessage(true);
    }
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
                    htmlFor="firstName"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faUser} /> First Name
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      placeholder={dummyData.firstName}
                      value={formData.firstName || dummyData.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        })
                      }
                      isValid={!validationMessages.firstName}
                      message={validationMessages.firstName}
                      name="firstName"
                      className="form-control form-control-blue"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="lastName"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faUser} /> Last Name
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      placeholder={dummyData.lastName}
                      value={formData.lastName || dummyData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      isValid={!validationMessages.lastName}
                      message={validationMessages.lastName}
                      name="lastName"
                      className="form-control form-control-blue"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="userName"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faUser} /> User Name
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      placeholder={dummyData.userName}
                      value={formData.userName || dummyData.userName}
                      onChange={(e) =>
                        setFormData({ ...formData, userName: e.target.value })
                      }
                      isValid={!validationMessages.userName}
                      message={validationMessages.userName}
                      name="userName"
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
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="email"
                      placeholder={dummyData.email}
                      value={formData.email || dummyData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      isValid={!validationMessages.email}
                      message={validationMessages.email}
                      name="email"
                      className="form-control form-control-blue"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="mobileNumber"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faPhoneAlt} /> Mobile Number
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      placeholder={dummyData.mobileNumber}
                      value={formData.mobileNumber || dummyData.mobileNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mobileNumber: e.target.value,
                        })
                      }
                      isValid={!validationMessages.mobileNumber}
                      message={validationMessages.mobileNumber}
                      name="mobileNumber"
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
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      placeholder={dummyData.age}
                      value={formData.age || dummyData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      isValid={!validationMessages.age}
                      message={validationMessages.age}
                      name="age"
                      className="form-control form-control-blue"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="birthdate"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} /> Birth Date
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="date"
                      placeholder={dummyData.birthDate}
                      value={formData.birthDate || dummyData.birthDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          birthDate: e.target.value,
                        })
                      }
                      isValid={!validationMessages.birthDate}
                      message={validationMessages.birthDate}
                      name="birthdate"
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
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                      className="form-select form-control-blue"
                    >
                      <option value="">{dummyData.area}</option>
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
