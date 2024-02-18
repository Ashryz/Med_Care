import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input } from "../utils/inputs/inputText";
import DSidebar from "./DSideBar/DSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhoneAlt, faCalendarAlt, faMapMarkerAlt, faDollarSign, faGraduationCap, faBrain } from "@fortawesome/free-solid-svg-icons";
import { Validations } from "../utils/validations/validation";
const DoctorProfile = () => {
  const [fname, setFname] = useState({ value: "", isValid: true, message: "" });
  const [lname, setLname] = useState({ value: "", isValid: true, message: "" });
  const [email, setEmail] = useState({ value: "", isValid: true, message: "" });
  const [phone, setPhone] = useState({ value: "", isValid: true, message: "" });
  const [age, setAge] = useState({ value: "", isValid: true, message: "" });
  const [gender, setGender] = useState("male");
  const [specialization, setSpecialization] = useState({ value: "", isValid: true, message: "" });
  const [degree, setDegree] = useState({ value: "", isValid: true, message: "" });
  const [area, setArea] = useState({ value: "", isValid: true, message: "" });
  const [fees, setFees] = useState({ value: "", isValid: true, message: "" });
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
      setSpecialization({ ...specialization, value: currentUserData.specialization });
      setDegree({ ...degree, value: currentUserData.degree });
      setArea({ ...area, value: currentUserData.area });
      setFees({ ...fees, value: currentUserData.fees });
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
        setFname({ value, isValid, message });
      } else {
        setLname({ value, isValid, message });
      }
      break;
    case "email":
     
      const emailValidationResult = Validations.emailValid(value);
      isValid = emailValidationResult.isValid;
      message = emailValidationResult.message;
      setEmail({ value, isValid, message });
      break;
    case "phone":
     
      const phoneValidationResult = Validations.phoneValid(value);
      isValid = phoneValidationResult.isValid;
      message = phoneValidationResult.message;
      setPhone({ value, isValid, message });
      break;
    case "age":
    
      const ageValidationResult = Validations.ageValid(parseInt(value));
      isValid = ageValidationResult.isValid;
      message = ageValidationResult.message;
      setAge({ value, isValid, message });
      break;
    case "gender":
      
      setGender(value);
      break;
     case "degree":
      setDegree({ value });
      break;
     case "area":
      setArea({ value });
      break; 
     case "specialization":
      setSpecialization({value});
      break; 
      case "fees":
      setFees({value});
      break; 
    default:
      break;
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submitting
    const isFormValid = validateForm();

    if (isFormValid) {
      const currentUserData = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        phone: phone.value,
        age: age.value,
        gender,
        specialization: specialization.value,
        degree: degree.value,
        area: area.value,
        fees: fees.value,
      };
      localStorage.setItem("currentUser", JSON.stringify(currentUserData));
      setShowSuccessMessage(true);
    }
  };

  const validateForm = () => {
    let isFormValid = true;

    // Validate first name
    if (!fname.isValid) {
      isFormValid = false;
    }

    // Validate last name
    if (!lname.isValid) {
      isFormValid = false;
    }

    // Validate email
    if (!email.isValid) {
      isFormValid = false;
    }

    // Implement validation for other fields as needed

    return isFormValid;
  };

  return (
    <div style={{ minHeight: "80vh" }} className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <DSidebar />
        </div>
        <div className="col-md-9">
          <div className="card bg-light p-4">
            <div className="card-header bg-primary text-light">
              <h3 className="text-center mb-0">Manage Profile</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* First Name */}
                <div className="mb-3 row">
                  <label
                    htmlFor="fname"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faUser} /> First Name
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={fname.value}
                      onChange={handleInputChange}
                      isValid={fname.isValid}
                      message={fname.message}
                      name="fname"
                      className={fname.isValid ? 'form-control is-valid' : 'form-control is-invalid'}
                      required 
                    />
                  </div>
                </div>
                {/* Last Name */}
                <div className="mb-3 row">
                  <label
                    htmlFor="lname"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faUser} /> Last Name
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={lname.value}
                      onChange={handleInputChange}
                      isValid={lname.isValid}
                      message={lname.message}
                      name="lname"
                      className={lname.isValid ? 'form-control is-valid' : 'form-control is-invalid'}
                      required 
                    />
                  </div>
                </div>
                {/* Email */}
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
                      placeholder="Email Address"
                      value={email.value}
                      onChange={handleInputChange}
                      isValid={email.isValid}
                      message={email.message}
                      name="email"
                      className={email.isValid ? 'form-control is-valid' : 'form-control is-invalid'}
                      required 
                    />
                  </div>
                </div>
                {/* Phone */}
                <div className="mb-3 row">
                  <label
                    htmlFor="phone"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faPhoneAlt} /> Phone Number
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      placeholder="Phone Number"
                      value={phone.value}
                      onChange={handleInputChange}
                      isValid={phone.isValid}
                      message={phone.message}
                      name="phone"
                      className={phone.isValid ? 'form-control is-valid' : 'form-control is-invalid'}
                      required 
                    />
                  </div>
                </div>
                {/* Age */}
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
                      placeholder="Age"
                      value={age.value}
                      onChange={handleInputChange}
                      isValid={age.isValid}
                      message={age.message}
                      name="age"
                      className={age.isValid ? 'form-control is-valid' : 'form-control is-invalid'}
                      required 
                    />
                  </div>
                </div>
                {/* Gender */}
                <div className="mb-3 row">
                  <label
                    htmlFor="gender"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faUser} /> Gender
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-select"
                      required 
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-3 row">
                  <label
                    htmlFor="specialization"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faBrain} className="me-2" /> Specialization
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="specialization"
                      className='form-select'
                      value={specialization.value}
                      onChange={handleInputChange}
                      required 
                    >
                      <option value="">Select specialization</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Neurology">Neurology</option>
                    </select>

                  </div>
                </div>
                
                <div className="mb-3 row">
                  <label
                    htmlFor="degree"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faGraduationCap} className="me-2" /> Degree
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="degree"
                      className='form-select'
                      value={degree.value}
                      onChange={handleInputChange}
                      required 
                    >
                      <option value="">Select degree</option>
                      <option value="MD">MD</option>
                      <option value="PhD">PhD</option>
                      <option value="MBBS">MBBS</option>
                    </select>

                  </div>
                </div>
               
                <div className="mb-3 row">
                  <label
                    htmlFor="area"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Area
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="area"
                      className='form-select'
                      value={area.value}
                      onChange={handleInputChange}
                      required 
                    >
                      <option value="">Select area</option>
                      <option value="Cairo">Cairo</option>
                      <option value="BNS">BNS</option>
                      <option value="Aswan">Aswan</option>
                    </select>

                  </div>
                </div>
                
                <div className="mb-3 row">
                  <label
                    htmlFor="fees"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faDollarSign} className="me-2" /> Fees
                    <sup style={{ color: "red" }}> *</sup>
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="fees"
                      className='form-select'
                      value={fees.value}
                      onChange={handleInputChange}
                      required 
                    >
                      <option value="">Select fees</option>
                      <option value="50">$50</option>
                      <option value="100">$100</option>
                      <option value="150">$150</option>
                    </select>

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
              </form>
            </div>
          </div>
        </div>
      </div>
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert" style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
          <strong>Profile Updated</strong> Profile updated successfully!
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowSuccessMessage(false)}></button>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;

