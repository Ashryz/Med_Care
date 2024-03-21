import React, { useState } from "react";
function HealthcareServices() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAskNow = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowSuccessMessage(true);
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
              <div className="card service-card border p-3 rounded-3 shadow">
                <div className="card-body m-3">
                  <h5 className="card-title prim-color service-title">
                    Have a Medical Question?
                  </h5>
                  <p className="card-text service-text text-muted">
                    Submit your medical question and receive an answer from a
                    specialized doctor.
                  </p>
                  <button className="btn main-btn" onClick={handleAskNow}>
                    Ask now
                  </button>
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
              <div className="modal-header bg-white">
                <h5 className="modal-title">Ask a Medical Question</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body bg-white">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="question" className="form-label">
                      Your Question
                    </label>
                    <textarea
                      className="form-control"
                      id="question"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                   
                    <button type="submit" className="btn main-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success message */}
      {showSuccessMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Success!</strong> Your question has been submitted
          successfully.
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseSuccessMessage}
          ></button>
        </div>
      )}
    </div>
  );
}

export default HealthcareServices;
