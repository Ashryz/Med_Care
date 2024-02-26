import "./changepass.css";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Sidebar from "../SideBar/Sidebar";
import axios from "axios";

const ChangePass = () => {
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState({
    errorPassword: null,
    errorConfirmation: null,
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch user data including password from the API
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://retoolapi.dev/VcvvU9/Userprofile/6" // Assuming the user ID is 5
      );
      if (response.data) {
        setUser({
          ...response.data,
          password: "", // Clear password for security reasons
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const inputChange = (e) => {
  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (e.target.name === "password") {
    setUser({
      ...user,
      password: e.target.value,
    });
    setErr({
      ...err,
      errorPassword: passRegex.test(e.target.value)
        ? ""
        : "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 6 characters long",
    });
  } else if (e.target.name === "confirmation") {
    setUser({
      ...user,
      confirmPassword: e.target.value,
    });
    setErr({
      ...err,
      errorConfirmation:
        e.target.value === user.password ? "" : "Passwords do not match",
    });
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match and meet criteria
    if (user.password !== user.confirmPassword) {
      setErr({
        ...err,
        errorConfirmation: "Passwords do not match",
      });
      return;
    }

    try {
      // Update the user data including the password in the API
      await axios.put("https://retoolapi.dev/VcvvU9/Userprofile/6", {
        ...user,
      });
      // Reset the input fields and errors
      setUser({
        ...user,
        password: "",
        confirmPassword: "",
      });
      setErr({
        errorPassword: null,
        errorConfirmation: null,
      });
      // Show success message
      setSuccessMessage("Password updated successfully!");
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <ListGroup className="cardheadlistStyle m-3 " >
              <ListGroup.Item
                className="cardhead prim-pg listgroupItem"
               
              >
              <div className="card-header prim-pg text-light">
                <h4 className="text-center ">
                  {" "}
                  Change Password
                </h4>
                </div>
              </ListGroup.Item>

              <ListGroup.Item>
                <form onSubmit={handleSubmit}>
                  <div className="p-3">
                    <label htmlFor="password" className="form-label  text-primary">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={user.password}
                      name="password"
                      onChange={inputChange}
                      required
                    />
                    <small className="text-danger">{err.errorPassword}</small>
                  </div>

                  <div className="p-3">
                    <label htmlFor="confirmation" className="form-label  text-primary">
                     Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmation"
                      placeholder="Confirm password"
                      value={user.confirmPassword}
                      name="confirmation"
                      onChange={inputChange}
                      required
                    />
                    <small className="text-danger">
                      {err.errorConfirmation}
                    </small>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn main-btn me-2">
                      Save
                    </button>
                    <button type="button" className="btn sec-btn ">
                      Cancel
                    </button>
                  </div>
                </form>
                {successMessage && (
                  <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                  </div>
                )}
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePass;

