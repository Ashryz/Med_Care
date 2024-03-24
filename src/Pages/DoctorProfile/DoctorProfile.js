import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosInstance } from "../../Network/axiosInstance";
import {
  faUser,
  faEnvelope,
  faPhoneAlt,
  faCalendarAlt,
  faCamera,
  faVenusMars,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import DSidebar from "../../Components/DoctorProfile/DSideBar/DSidebar";
import { Validations } from "../../Components/utils/validations/validation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    gender: "",
    Image: "",
    ImageFile: null,
    address :"",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    age: "",
    area: "",
    fees: "",
    gender: "",
    specialization: "",
    degree: "",
    address: "", 
  });

  const authContext = useContext(AuthContext);
  const localuser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const fetchDoctorData = () => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/auth/users/${localuser.id}/`)
        .then((response) => {
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
            img,
            address, 
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
            Image: img,
            address, 
          });
          setIsLoading(false);
          resolve();
        })
        .catch((error) => {
          console.error("Error fetching doctor data:", error);
          reject(error);
        });
    });
  };

  const handleChooseProfilePicture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setShowModal(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctorData((prevDoctorData) => ({
      ...prevDoctorData,
      Image: URL.createObjectURL(file),
      ImageFile: file,
    }));
    setShowModal(false);
  };

  const handleDeleteProfilePicture = () => {
    setDoctorData((prevDoctorData) => ({
      ...prevDoctorData,
      Image: "", // Clear image URL
      ImageFile: null, // Clear image file
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
     case "address":
        if (value.length < 10) {
          errorMessage = "Address should be at least 10 characters long";
        } else if (
        /[!@#$%^&*()"{}\[\]]/.test(value)
        ) {
          errorMessage =
          "Address should not contain special characters like @, #, %, &, *, (), '', {}, or []";
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

    const isValid = Object.values(validationErrors).every(
      (error) => error === ""
    );
    if (!isValid) {
      console.error("Form has validation errors");
      return;
    }
    try {
      const userId = authContext.currentUser.id;

      const formData = new FormData();
      formData.append("username", doctorData.username);
      formData.append("first_name", doctorData.fname);
      formData.append("last_name", doctorData.lname);
      formData.append("email", doctorData.email);
      formData.append("phone", doctorData.phone);
      formData.append("age", doctorData.age);
      formData.append("city", doctorData.area);
      formData.append("gender", doctorData.gender);
      formData.append("address", doctorData.address);
      // Check if ImageFile is not null before appending
      if (doctorData.ImageFile) {
        formData.append("img", doctorData.ImageFile);
      }

      const response = await axiosInstance.put(
        `/auth/users/${userId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setShowSuccessMessage(true);
        authContext.setCurrentUser(response.data);
        dispatch({
          type: "SET_ALERT",
          payload: {
            strong: "Congratulations!",
            txt: " Profile updated successfully",
            type: "success",
          },
        });
        navigate("/");
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating doctor data:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDoctorData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage]);

  return (
    <div className="container mt-5">
      {isLoading ? (
         <p className="prim-color d-flex justify-content-center align-items-center " style={{ minHeight: '40.4vh' }}>Loading...</p>
      ) : (
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
                          src={`http://localhost:8000${authContext.currentUser.img}`}
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
                      style={{ display: "none" }}
                    >
                      <FontAwesomeIcon icon={faUser} /> Username
                    </label>
                    <div
                      className="col-sm-9"
                      style={{ display: "none" }}
                    >
                      <input
                        type="text"
                        name="username"
                        value={doctorData.username}
                        onChange={handleInputChange}
                        className="form-control form-control-blue"
                        disabled
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
                      <div className="text-danger">
                        {validationErrors.fname}
                      </div>
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
                      <div className="text-danger">
                        {validationErrors.lname}
                      </div>
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
                      <div className="text-danger">
                        {validationErrors.email}
                      </div>
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
                      <div className="text-danger">
                        {validationErrors.phone}
                      </div>
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
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </Form.Select>
                    </div>
                  </div>
		<div className="mb-3 row">
		  <label
		    htmlFor="address"
		    className="form-label col-sm-3 text-primary"
		  >
		    <FontAwesomeIcon icon={faMapMarkerAlt} /> Address
		  </label>
		  <div className="col-sm-9">
		    <input
		      type="text"
		      name="address"
		      value={doctorData.address}
		      onChange={handleInputChange}
		      className="form-control form-control-blue"
		    />
		    <div className="text-danger">
		      {validationErrors.address}
		    </div>
		  </div>
		</div>
                  <div className="text-center">
                    <button type="submit" className="btn main-btn me-2">
                      Save
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

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header className="bg-white" closeButton>
              <Modal.Title>Profile Picture Options</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-white">
              <div className="text-center">
                {/* Display the profile picture */}
                {doctorData.Image && (
                  <img
                    src={
                      doctorData.Image
                        ? `http://localhost:8000${doctorData.Image}`
                        : `http://127.0.0.1:8000//media/profile_images/profile.jpeg`
                    }
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
      )}
    </div>
  );
};

export default DoctorProfile;
