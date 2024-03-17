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
  faDollarSign,
  faGraduationCap,
  faBrain,
   faCamera,
   faInfoCircle,
   faVenusMars
} from "@fortawesome/free-solid-svg-icons";
import DSidebar from "../../Components/DoctorProfile/DSideBar/DSidebar";
import { Validations } from "../../Components/utils/validations/validation";

const DoctorProfile = () => {
  const [doctorData, setDoctorData] = useState({
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
      const response = await axios.get(
        "https://retoolapi.dev/46yPXc/doctors"
      );
      if (response.data.length > 0) {
        const currentDoctorData = response.data[2];
        setDoctorData(currentDoctorData);
      }
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
    const isValid = Object.values(validationErrors).every((error) => error === "");
    if (!isValid) {
      console.error("Form has validation errors");
      return;
    }

    try {
      const existingDoctorResponse = await axios.get(
        "https://retoolapi.dev/1qOuQb/Doctorprofile"
      );
      const existingDoctor = existingDoctorResponse.data.length > 0;

      const method = existingDoctor ? "put" : "post";
      const url = existingDoctor
        ? `https://retoolapi.dev/46yPXc/doctors/${existingDoctorResponse.data[2].id}`
        : "https://retoolapi.dev/46yPXc/doctors";

      await axios[method](url, doctorData);

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
                        src={+doctorData.Image ? doctorData.Image : "img/profile.jpeg"}
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
                 {/* Bio Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="bio"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />Bio
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      name="bio"
                      value={doctorData.bio}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.bio}</div>
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
                  <label htmlFor="gender" className="form-label col-sm-3 text-primary">
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
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                     
                    </Form.Select>
                    
                  </div>
                </div>
                {/* Area Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="area"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Area
                  </label>
                  <div className="col-sm-9">
                    <Form.Select
                      value={doctorData.area}
                      name="area"
                      onChange={handleInputChange}
                      className="form-select form-control-blue"
                    >
                      <option value="">Select Area</option>
                      <option value="">Select Area</option>
                       <option value="Cairo">Cairo</option>
		    <option value="Alexandria">Alexandria</option>
		    <option value="Giza">Giza</option>
		    <option value="Port Said">Port Said</option>
		    <option value="Suez">Suez</option>
		    <option value="Luxor">Luxor</option>
		    <option value="Asyut">Asyut</option>
		    <option value="Ismailia">Ismailia</option>
		    <option value="Faiyum">Faiyum</option>
		    <option value="Beni Suef">Beni Suef</option>
		    <option value="Mansoura">Mansoura</option>
		    <option value="Damietta">Damietta</option>
		    <option value="Assiut">Assiut</option>
		    <option value="Minya">Minya</option>
		    <option value="Sohag">Sohag</option>
		    <option value="Qena">Qena</option>
		    <option value="Aswan">Aswan</option>
		    <option value="Beheira">Beheira</option>
		    <option value="Kafr El Sheikh">Kafr El Sheikh</option>
		    <option value="Matruh">Matruh</option>
		    <option value="New Valley">New Valley</option>
		    <option value="North Sinai">North Sinai</option>
		    <option value="South Sinai">South Sinai</option>
		    <option value="Red Sea">Red Sea</option>
		    <option value="Gharbia">Gharbia</option>
		    <option value="Dakahlia">Dakahlia</option>
		    <option value="Sharqia">Sharqia</option>
		    <option value="Monufia">Monufia</option>
		    <option value="Kafr El Sheikh">Kafr El Sheikh</option>
                    </Form.Select>
                    <div className="text-danger">{validationErrors.area}</div>
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
                      value={doctorData.fees}
                      onChange={handleInputChange}
                      className="form-control form-control-blue"
                    />
                    <div className="text-danger">{validationErrors.fees}</div>
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
                    <Form.Select
                      value={doctorData.specialization}
                      name="specialization"
                      onChange={handleInputChange}
                      className="form-select form-control-blue"
                    >
                      <option value="">Select Specialization</option>
                      <option value="Dermatology">Dermatology (Skin)</option>
                      <option value="Dentistry">Dentistry (Teeth)</option>
                      <option value="Psychiatry">Psychiatry (Mental, Emotional or Behavioral Disorders)</option>
                      <option value="Pediatrics">Pediatrics and New Born (Child)</option>
                      <option value="Neurology">Neurology (Brain & Nerves)</option>
                      <option value="Orthopedics">Orthopedics (Bones)</option>
                      <option value="Gynecology">Gynecology and Infertility</option>
                      <option value="ENT">Ear, Nose and Throat</option>
                      <option value="Cardiology">Cardiology and Vascular Disease (Heart)</option>
                      <option value="Allergy">Allergy and Immunology (Sensitivity and Immunity)</option>
                      <option value="Andrology">Andrology and Male Infertility</option>
                      <option value="Audiology">Audiology</option>
                      <option value="CardiacSurgery">Cardiology and Thoracic Surgery (Heart & Chest)</option>
                      <option value="VascularSurgery">Vascular Surgery (Arteries and Vein Surgery)</option>
                      <option value="ChestRespiratory">Chest and Respiratory</option>
                      <option value="Diabetes">Diabetes and Endocrinology</option>
                      <option value="Radiology">Diagnostic Radiology (Scan Centers)</option>
                      <option value="Dietitian">Dietitian and Nutrition</option>
                      <option value="FamilyMedicine">Family Medicine</option>
                      <option value="Gastroenterology">Gastroenterology and Endoscopy</option>
                      <option value="GeneralPractice">General Practice</option>
                      <option value="GeneralSurgery">General Surgery</option>
                      <option value="Geriatrics">Geriatrics (Old People Health)</option>
                      <option value="Hematology">Hematology</option>
                      <option value="Hepatology">Hepatology (Liver Doctor)</option>
                      <option value="InternalMedicine">Internal Medicine</option>
                      <option value="InterventionalRadiology">Interventional Radiology (Interventional Radiology)</option>
                      <option value="IVF">IVF and Infertility</option>
                      <option value="Laboratories">Laboratories</option>
                      <option value="Nephrology">Nephrology</option>
                      <option value="Neurosurgery">Neurosurgery (Brain & Nerves Surgery)</option>
                      <option value="Obesity">Obesity and Laparoscopic Surgery</option>
                      <option value="Oncology">Oncology (Tumor)</option>
                      <option value="OncologySurgery">Oncology Surgery (Tumor Surgery)</option>
                      <option value="Ophthalmology">Ophthalmology (Eyes)</option>
                      <option value="Osteopathy">Osteopathy (Osteopathic Medicine)</option>
                      <option value="PainManagement">Pain Management</option>
                      <option value="PediatricSurgery">Pediatric Surgery</option>
                      <option value="Phoniatrics">Phoniatrics (Speech)</option>
                      <option value="Physiotherapy">Physiotherapy and Sport Injuries</option>
                      <option value="PlasticSurgery">Plastic Surgery</option>
                      <option value="Rheumatology">Rheumatology</option>
                      <option value="SpinalSurgery">Spinal Surgery</option>
                      <option value="Urology">Urology (Urinary System)</option>
                    </Form.Select>
                    <div className="text-danger">{validationErrors.specialization}</div>
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
                    <Form.Select
                      value={doctorData.degree}
                      name="degree"
                      onChange={handleInputChange}
                      className="form-select form-control-blue"
                    >
                      <option value="">Select Degree</option>
                      <option value="MBBS">MBBS</option>
                      <option value="MD">MD</option>
                      <option value="MS">MS</option>
                      <option value="PhD">PhD</option>
                    </Form.Select>
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header  className="bg-white" closeButton>
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

