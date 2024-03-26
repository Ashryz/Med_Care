import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Sidebar from "./Sidebar";
import "./style.css";
import { useState } from "react";
import { axiosInstance } from "../../Network/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AddSchedule() {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    doctor: authContext.currentUser.id,
    day: "saturday",
    start_time: "",
    end_time: "",
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [existingDays, setExistingDays] = useState([]);

  useEffect(() => {
    if (authContext.currentUser && authContext.currentUser.id) {
      const userId = authContext.currentUser.id;
      axiosInstance
        .get(`/schedules/all_sch/doctor/${userId}/`)
        .then((response) => {
          const days = response.data.map((schedule) =>
            schedule.day.toLowerCase()
          );
          setExistingDays(days);
        })
        .catch((error) => {
          console.error("Error fetching existing schedules:", error);
        });
    }
  }, [authContext.currentUser]);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingDays.includes(formData.day.toLowerCase())) {
      console.error("This day already exists in the schedule.");
      setError("This day already exists in the schedule.");
      return;
    }
    if (formData.start_time >= formData.end_time) {
      setError("End time must be after start time.");
      return;
    }
    const userId = authContext.currentUser.id;
    axiosInstance
      .post(`/schedules/all_sch/doctor/${userId}/`, formData)
      .then((response) => {
        console.log("Schedule created successfully");
        navigate("/ViewSchedule");
      })
      .catch((error) => {
        console.error("Error creating schedule:", error);
      });
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
   {error && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
          <div>{error}</div>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseError}></button>
        </div>
      )}
      <div className="App"
      
      >
        <div className="container-fluid">
          <div className="row">
            <hr />
            <div className="side col-md-3 ">
              <Sidebar />
            </div>
            <div className="col-md-9  mt-3">
              <Form
                onSubmit={handleSubmit}
                className="w-75 rounded-4 shadow mx-auto bg-white text-dark"
              >
                <div
                  className="prim-pg text-center text-white p-1"
                  style={{ borderRadius: "11px 11px 0px 0px" }}
                >
                  <span className="fw-light">Add Schedule</span>
                </div>
                <div className="p-2 m-2">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Day</Form.Label>
                    <Form.Select
                      name="day"
                      value={formData.day}
                      onChange={handleChange}
                    >
                      {["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                        <option
                          key={day.toLowerCase()}
                          value={day.toLowerCase()}
                        >
                          {day}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="start_time"
                      value={formData.start_time}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="end_time"
                      value={formData.end_time}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* <label>
                    Active Now
                    <input
                      className="ms-2"
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_active: e.target.checked,
                        })
                      }
                    />
                  </label> */}

                  <div className="text-center mb-3">
                    <Button  type="submit" className="main-btn">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSchedule;
