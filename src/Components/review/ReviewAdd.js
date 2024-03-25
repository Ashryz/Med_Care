import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Modal, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import "./Review.css";

import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../Network/axiosInstance";
function ReviewAdd({ doctor_id, onClose, refresh }) {
  // const revobj
  //6,john@gmail.com,1,6,ahmedp@gmail.com,Dr. John is very good,2025-09-20,5,person.jpg
  const [animated, setAnimated] = useState("");
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  const revobg = {
    user: currentUser.id,
    doctor: doctor_id,
    comment: "",
    rating: "",
  };

  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleStarClick = (rating) => {
    setStarRating(rating);
    console.log(rating);
  };

  const handleAddReview = (e) => {
    e.preventDefault();

    if (reviewText === "" || starRating === 0) {
      setAnimated("animate__animated animate__shakeX");
      setTimeout(() => {
        setAnimated("");
      }, 500);
      return;
    }
    const updatedRevObj = {
      ...revobg,
      comment: reviewText,
      rating: starRating,
    };
    axiosInstance.post("/ratings/", updatedRevObj).then((response) => {
      
      refresh();
    });

    handleClose();
  };

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Body>
        <div
          className="light-bg border rounded-3 "
          style={{ position: "relative", maxWidth: "400px", margin: "0 auto" }}
        >
          <Card.Body>
            <Row className="align-items-center justify-content-center mt-5 p-1">
              <div className="col-sm-6 text-center">
                <div className="rounded-5 shadow p-2 main-btn">
                  <p className="mb-0">
                    <span className="ms-2 fs-8 text-light">Add Review</span>
                  </p>
                </div>
              </div>
            </Row>
            <Row className="justify-content-center align-items-center m-0 p-3">
              <div className={`col-md-12 text-center ${animated}`}>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <span
                      key={index}
                      onClick={() => handleStarClick(ratingValue)}
                    >
                      {ratingValue <= starRating ? (
                        <FaStar
                          color="dodgerblue"
                          className="m-1"
                          size={20}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <CiStar
                          color="dodgerblue"
                          className="m-1"
                          size={20}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </span>
                  );
                })}
              </div>
            </Row>
            <Row className="justify-content-center m-0 p-2">
              <div className="col-md-12">
                <form className=" p-3 rounded-5">
                  <textarea
                    className={`form-control rounded-5 shadow-lg p-3 ${
                      reviewText === "" ? animated : ""
                    }`}
                    rows="5"
                    value={reviewText}
                    onChange={handleReviewChange}
                    placeholder="Write your review here..."
                  />
                  <Row className="align-items-center m-0 p-3 justify-content-center mt-2">
                    <div className="col-sm-6 text-center">
                      <Button
                        className="btn main-btn rounded-5 shadow-lg p-2"
                        style={{ width: "80%", fontSize: "1rem" }}
                        onClick={handleAddReview}
                      >
                        Submit
                      </Button>
                    </div>
                    <div className="col-sm-6 text-center mt-2 mt-sm-0">
                      <Button
                        className="btn sec-btn rounded-5 shadow-lg p-2"
                        style={{ width: "80%", fontSize: "1rem" }}
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Row>
                </form>
              </div>
            </Row>
          </Card.Body>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ReviewAdd;
