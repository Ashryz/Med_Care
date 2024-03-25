import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { axiosInstance } from "../../Network/axiosInstance";
import { AuthContext } from "../../context/AuthContext";

function HealthcareServices() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [question, setQuestion] = useState(""); // State to store the question
  const authContext = useContext(AuthContext);
  const localuser = JSON.parse(localStorage.getItem("user"));
  const isDoctor = localuser && localuser.is_doctor; 
  const mytheme = useSelector((state) => state.combineThemes.theme);

  const handleAskNow = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(`questions/user/${localuser.id}/`, { question });
      setShowSuccessMessage(true);
      setQuestion(""); // Clear the question input
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  return (
    <div className="container-fluid p-5">
      <h2 className="text-center mb-5">Our Healthcare Services</h2>
      <div className="row">
        <div className="col-12">
          <div className="row mb-4">
            <div className="col-12">
              <div className={`card service-card border p-3 rounded-3 shadow ${mytheme === 'light' ? '' : 'text-white bg-dark'} `}>
                <div className="card-body m-3">
                  <h5 className="card-title prim-color service-title">Have a Medical Question?</h5>
                  <p className="card-text service-text ">Submit your medical question and receive an answer from a specialized doctor.</p>
                  {!isDoctor && (
                    <button className="btn main-btn" onClick={handleAskNow} disabled={isDoctor}>
                      Ask now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className=" modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered  ">
            <div className="modal-content border rounded-3 opacity-1 shadow  ">
              <div className={`modal-header ${mytheme === 'light' ? '' : 'text-white bg-dark'} `}>
                <h5 className="modal-title">Ask a Medical Question</h5>
                <button type="button" className={`btn-close  ${mytheme === 'light' ? '' : 'bg-white '} `} onClick={handleCloseModal}></button>
              </div>
              <div className={`modal-body ${mytheme === 'light' ? '' : 'text-white bg-dark'} `}>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="question" className="form-label">Your Question</label>
                    <textarea className="form-control" id="question" rows="3" value={question} onChange={(e) => setQuestion(e.target.value)} required></textarea>
                  </div>
                  <div className={`modal-footer  ${mytheme === 'light' ? '' : 'text-white bg-dark'}`}>
                    <button type="submit" className="btn main-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success message */}
      {showSuccessMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success!</strong> Your question has been submitted successfully.
          <button type="button" className="btn-close" onClick={handleCloseSuccessMessage}></button>
        </div>
      )}
    </div>
  );
}

export default HealthcareServices;

