import React, { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import "./Review.css";
import { axiosInstance } from "../../Network/axiosInstance";

function EditableReview({ revObj, onClose ,refresh}) {
  const [reviewText, setReviewText] = useState(revObj.comment);
  const [starRating, setStarRating] = useState(revObj.rating);
  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleStarClick = (rating) => {
    setStarRating(rating);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put(`/ratings/${revObj.id}/`, {
      doctor: revObj.doctor,
      user: revObj.user.id,
      rating: starRating,
      comment: reviewText,
    }).then((response) => {
      
      refresh();
    
    });
    onClose();
  };
  const handelCancel = () => {
    onClose();
  };

  useEffect(() => {}, [revObj]);

  return (
    <div
      className="light-bg border rounded-3 "
      style={{ position: "relative", margin: "0 ", width: "100%" }}
    >
      <img
        src={`http://localhost:8000${revObj.user.img}`}
        className="rounded-circle shadow"
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          top: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        alt="patient"
      />
      <Card.Body>
        <Row className="align-items-center justify-content-center mt-5 p-1">
          <div className="col-sm-6 text-center">
            <div className="rounded-5 shadow p-2 main-btn">
              <p className="mb-0">
                <span className="bg-warning badge rounded-pill text-dark">
                  !
                </span>
                <span className="ms-2 fs-8 text-light">Edit Review</span>
              </p>
            </div>
          </div>
        </Row>
        <Row className="justify-content-center align-items-center m-0 p-3">
          <div className="col-12 text-center">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <span key={index} onClick={() => handleStarClick(ratingValue)}>
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
            <form className=" p-3 rounded-5" onSubmit={(e) => handelSubmit(e)}>
              <textarea
                className="form-control mb-2 shadow-lg"
                rows="5"
                value={reviewText}
                onChange={handleReviewChange}
              />
              <Row className="align-items-center m-0 p-3 justify-content-center mt-2">
                <div className="col-sm-6 text-center">
                  <Button
                    className="btn main-btn rounded-5 shadow-lg p-2"
                    style={{ width: "80%", fontSize: "1rem" }}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
                <div className="col-sm-6 text-center mt-2 mt-sm-0">
                  <Button
                    className="btn sec-btn rounded-5 shadow-lg p-2"
                    style={{ width: "80%", fontSize: "1rem" }}
                    onClick={handelCancel}
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
  );
}

export default EditableReview;
