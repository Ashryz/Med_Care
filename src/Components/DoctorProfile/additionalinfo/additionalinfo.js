import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const response = await axiosInstance.get(`/doctors/doctor/${userId}/`); // Fetch doctor data by ID using axiosInstance
      const { specialization, bio, degree, area, fees } = response.data;
      setUserData({ specialization, bio, degree, area, fees });
    } catch (error) {
      console.error("Error fetching doctor data:", error);
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
      case "bio":
        if (value.length < 10) {
          errorMessage = "Bio must be at least 10 characters long";
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
      await axiosInstance.put(`/doctors/doctor/${userId}/`, userData); // Update doctor profile by ID using axiosInstance
      dispatch({
        type: "SET_ALERT",
        payload: {
          strong: "Congratulations!",
          txt: " Profile updated successfully",
          type: "success",
        },
      });
      navigate("/");
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error updating doctor profile:", error);
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
                {/* Bio Input */}
                <div className="mb-3 row">
                  <label
                    htmlFor="bio"
                    className="form-label col-sm-3 text-primary"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Bio
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
                      value={userData.area}
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
                      value={userData.fees}
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
                      value={userData.specialization}
                      name="specialization"
                      onChange={handleInputChange}
                      className="form-select form-control-blue"
                    >
                      <option value="">Select Specialization</option>
                      <option value="Dermatology">Dermatology (Skin)</option>
                      <option value="Dentistry">Dentistry (Teeth)</option>
                      <option value="Psychiatry">
                        Psychiatry (Mental, Emotional or Behavioral Disorders)
                      </option>
                      <option value="Pediatrics">
                        Pediatrics and New Born (Child)
                      </option>
                      <option value="Neurology">
                        Neurology (Brain & Nerves)
                      </option>
                      <option value="Orthopedics">Orthopedics (Bones)</option>
                      <option value="Gynecology">
                        Gynecology and Infertility
                      </option>
                      <option value="ENT">Ear, Nose and Throat</option>
                      <option value="Cardiology">
                        Cardiology and Vascular Disease (Heart)
                      </option>
                      <option value="Allergy">
                        Allergy and Immunology (Sensitivity and Immunity)
                      </option>
                      <option value="Andrology">
                        Andrology and Male Infertility
                      </option>
                      <option value="Audiology">Audiology</option>
                      <option value="CardiacSurgery">
                        Cardiology and Thoracic Surgery (Heart & Chest)
                      </option>
                      <option value="VascularSurgery">
                        Vascular Surgery (Arteries and Vein Surgery)
                      </option>
                      <option value="ChestRespiratory">
                        Chest and Respiratory
                      </option>
                      <option value="Diabetes">
                        Diabetes and Endocrinology
                      </option>
                      <option value="Radiology">
                        Diagnostic Radiology (Scan Centers)
                      </option>
                      <option value="Dietitian">Dietitian and Nutrition</option>
                      <option value="FamilyMedicine">Family Medicine</option>
                      <option value="Gastroenterology">
                        Gastroenterology and Endoscopy
                      </option>
                      <option value="GeneralPractice">General Practice</option>
                      <option value="GeneralSurgery">General Surgery</option>
                      <option value="Geriatrics">
                        Geriatrics (Old People Health)
                      </option>
                      <option value="Hematology">Hematology</option>
                      <option value="Hepatology">
                        Hepatology (Liver Doctor)
                      </option>
                      <option value="InternalMedicine">
                        Internal Medicine
                      </option>
                      <option value="InterventionalRadiology">
                        Interventional Radiology (Interventional Radiology)
                      </option>
                      <option value="IVF">IVF and Infertility</option>
                      <option value="Laboratories">Laboratories</option>
                      <option value="Nephrology">Nephrology</option>
                      <option value="Neurosurgery">
                        Neurosurgery (Brain & Nerves Surgery)
                      </option>
                      <option value="Obesity">
                        Obesity and Laparoscopic Surgery
                      </option>
                      <option value="Oncology">Oncology (Tumor)</option>
                      <option value="OncologySurgery">
                        Oncology Surgery (Tumor Surgery)
                      </option>
                      <option value="Ophthalmology">
                        Ophthalmology (Eyes)
                      </option>
                      <option value="Osteopathy">
                        Osteopathy (Osteopathic Medicine)
                      </option>
                      <option value="PainManagement">Pain Management</option>
                      <option value="PediatricSurgery">
                        Pediatric Surgery
                      </option>
                      <option value="Phoniatrics">Phoniatrics (Speech)</option>
                      <option value="Physiotherapy">
                        Physiotherapy and Sport Injuries
                      </option>
                      <option value="PlasticSurgery">Plastic Surgery</option>
                      <option value="Rheumatology">Rheumatology</option>
                      <option value="SpinalSurgery">Spinal Surgery</option>
                      <option value="Urology">Urology (Urinary System)</option>
                    </Form.Select>
                    <div className="text-danger">
                      {validationErrors.specialization}
                    </div>
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
                      value={userData.degree}
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
    </div>
  );
};

export default AdditionalInfo;
