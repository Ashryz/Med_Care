import React, { useEffect } from "react";
import "./signup.css";
import { useState } from "react";
import { Input } from "../../Components/SignUp/utils/inputs/inputText.js";
import { Button, Form } from "react-bootstrap";
import { Validations } from "../../Components/SignUp/utils/validations/validation.js";
import AlertNew from "../../Components/SignUp/utils/alert/alertNew.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

export function SignUpDoc({ userType, onClose }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const handleCloseAlert = () => setShowAlert(false);
  const dispatch = useDispatch();

  const [fname, setFname] = useState({
    value: "",
    isValid: false,
    message: "",
  });
  const [lname, setLname] = useState({
    value: "",
    isValid: false,
    message: "",
  });
  const [email, setEmail] = useState({
    value: "",
    isValid: false,
    message: "",
  });
  const [phone, setPhone] = useState({
    value: "",
    isValid: false,
    message: "",
  });
  const [password, setPassword] = useState({
    value: "",
    isValid: false,
    message: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isValid: false,
    message: "",
  });
  const [age, setAge] = useState({ value: "", isValid: false, message: "" });
  const [gender, setGender] = useState("M");

  const handelChange = function (e) {
    let result = { isValid: false, message: "" };

    switch (e.target.name) {
      case "fname":
        result = Validations.nameValid(e.target.value);
        setFname({
          value: e.target.value,
          isValid: result.isValid,
          message: result.message,
        });
        e.target.className = result.isValid
          ? "form-control is-valid"
          : "form-control is-invalid";
        break;
      case "lname":
        result = Validations.nameValid(e.target.value);
        setLname({
          value: e.target.value,
          isValid: result.isValid,
          message: result.message,
        });
        e.target.className = result.isValid
          ? "form-control is-valid"
          : "form-control is-invalid";
        break;
      case "email":
        result = Validations.emailValid(e.target.value);
        setEmail({
          value: e.target.value,
          isValid: result.isValid,
          message: result.message,
        });
        e.target.className = result.isValid
          ? "form-control is-valid"
          : "form-control is-invalid";
        break;
      case "phone":
        result = Validations.phoneValid(e.target.value);
        setPhone({
          value: e.target.value,
          isValid: result.isValid,
          message: result.message,
        });
        e.target.className = result.isValid
          ? "form-control is-valid"
          : "form-control is-invalid";
        break;
      case "password":
        result = Validations.passwordValid(e.target.value);
        setPassword({
          value: e.target.value,
          isValid: result.isValid,
          message: result.message,
        });
        e.target.className = result.isValid
          ? "form-control is-valid"
          : "form-control is-invalid";
        break;
      case "confirmPassword":
        result = Validations.confirmPasswordValid(
          password.value,
          e.target.value
        );
        setConfirmPassword({
          value: e.target.value,
          isValid: result.isValid,
          message: result.message,
        });
        e.target.className = result.isValid
          ? "form-control is-valid"
          : "form-control is-invalid";
        break;
      case "age":
        result = Validations.ageValid(parseInt(e.target.value));
        setAge({
          value: e.target.value,
          isValid: result.isValid,
          message: result.message,
        });
        e.target.className = result.isValid
          ? "form-control is-valid"
          : "form-control is-invalid";
        break;
      case "gender":
        setGender(e.target.value);
        break;
      default:
        break;
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target[8].disabled = true;
    

    try {
      if (
        fname.isValid &&
        lname.isValid &&
        email.isValid &&
        phone.isValid &&
        password.isValid &&
        confirmPassword.isValid &&
        age.isValid
      ) {
        const newUser = {
          first_name: fname.value,
          last_name: lname.value,
          username: fname.value + "_" + lname.value,
          email: email.value,
          password: password.value,
          age: age.value,
          gender: gender,
          phone: phone.value,
          is_doctor: userType === "Doctor",
          is_patient: userType === "Patient",
          imgleink: "default img",
        };

        const response = await axios.post(
          "http://127.0.0.1:8000/auth/register/",
          newUser
        );

        // Check if the registration was successful
        if (response.status === 200) {
          setSignedUp(true);
          
        }
      } else {
        setAlertTitle("Error");
        setAlertMessage("Please fill all the fields correctly");
        e.target[8].disabled = false;
        setShowAlert(true);
      }
    } catch (error) {
      if (!error.response) {
        // No response from server
        setAlertTitle("Error");
        setAlertMessage("Server is not responding. Please try again later.");
        setShowAlert(true);
        e.target[8].disabled = false;
      } else {
        // Server responded with an error
        let errorMessage = "";
        for (const key in error.response.data) {
          errorMessage += `${key}: ${error.response.data[key]}\n`;
        }

        e.target[8].disabled = false;
    
        console.error("Error:", error);
        setAlertTitle("Error");
        setAlertMessage(errorMessage);
        setShowAlert(true);
      }
    }
  };

  useEffect(() => {
    if (signedUp) {
      
      dispatch({
        type: "SET_ALERT",
        payload: {
          strong: "Congratulations!",
          txt: " Please Check your email to verify your account",
          type: "success",
        },
      });
      navigate("/");
      
    }
  }, [signedUp, navigate, dispatch]);

  return (
    <div className="container  mt-2 text-center  p-2  ">
      <div className="text-center ">
        {showAlert && (
          <AlertNew
            title={alertTitle}
            message={alertMessage}
            onClose={handleCloseAlert}
          />
        )}
      </div>
      <Form
        className="container text-start p-4 border rounded-4"
        onSubmit={handleSubmit}
      >
        <div className="d-flex justify-content-center">
          <h2 className="prim-color text-capitalize">
            {userType} <span className="sec-color">Sign Up</span>
          </h2>
        </div>
        <Input
          name="fname"
          label="First Name"
          type="text"
          placeholder="Enter First Name"
          onChange={(e) => handelChange(e)}
          value={fname.value}
          message={fname.message}
        />
        <Input
          name="lname"
          label="Last Name"
          type="text"
          placeholder="Enter Last Name"
          onChange={(e) => handelChange(e)}
          value={lname.value}
          message={lname.message}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Enter Email"
          onChange={(e) => handelChange(e)}
          value={email.value}
          message={email.message}
        />
        <Input
          name="phone"
          label="Phone"
          type="text"
          placeholder="Enter Phone"
          onChange={(e) => handelChange(e)}
          value={phone.value}
          message={phone.message}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => handelChange(e)}
          value={password.value}
          isValid={password.isValid}
          message={password.message}
        />
        <Input
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Enter Confirm Password"
          onChange={(e) => handelChange(e)}
          value={confirmPassword.value}
          isValid={confirmPassword.isValid}
          message={confirmPassword.message}
        />
        <Input
          name="age"
          label="Age"
          type="text"
          placeholder="Enter Age"
          onChange={(e) => handelChange(e)}
          value={age.value}
          isValid={age.isValid}
          message={age.message}
        />
        <Form.Group controlId="formBasicGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            className="form-user-select-sm shadow"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-center mt-3">
          <Button variant="" type="submit" className="shadow w-75 main-btn">
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
}
