import React from "react";
import { Card, Modal, Row } from "react-bootstrap";
import EditableReview from "./EditableReview";
import ReviewDel from "./ReviewDel";

import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import "./Review.css";
const ReviewCard = ({ revObj }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [action, setAction] = React.useState(null);

  const handleClose = () => {
    setShowModal(false);
    setAction(null);
  };

  return (
    <div
      className="light-bg border rounded-3 shadow-lg"
      style={{
        position: "relative",
        maxWidth: "400px",
        margin: "0 auto",
        minHeight: "400px",
      }}
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
        <Row className="align-items-center m-0 p-3 justify-content-center mt-5">
          {/* <div className="col-sm-6 text-center">
            <Button
              className="btn main-btn rounded-5 shadow-lg p-2"
              style={{ width: "80%", fontSize: "1rem" }}
              onClick={() => handleShow("edit")}
            >
              Edit
            </Button>
          </div>
          <div className="col-sm-6 text-center mt-2 mt-sm-0">
            <Button
              className="btn sec-btn rounded-5 shadow-lg p-2"
              style={{ width: "80%", fontSize: "1rem" }}
              onClick={() => handleShow("del")}
            >
              Delete
            </Button>
          </div> */}
        </Row>
        <Row className="justify-content-center align-items-center m-0 p-3">
          <div className="col-12 text-center">
            {[...Array(parseInt(revObj.rating))].map((_, index) => (
              <FaStar
                key={index}
                color="dodgerblue"
                className="m-1"
                size={20}
              />
            ))}
            {[...Array(5 - parseInt(revObj.rating))].map((_, index) => (
              <CiStar
                key={index}
                color="dodgerblue"
                className="m-1"
                size={20}
              />
            ))}
          </div>
        </Row>
        <Row className="justify-content-center m-0 p-3 h-50">
          <div className="col-12 text-center bg-light p-3 rounded-3 shadow-lg">
            <p className="text-capitalize" style={{ wordWrap: "break-word" }}>
              {revObj.comment}
            </p>
          </div>
        </Row>
        <Row className="justify-content-center m-0 p-3">
          <div className="col-12 text-center">
            <p className="text-muted small fs-8 text-center">
              Last update: {revObj.created_at.split("T")[0]}
            </p>
          </div>
        </Row>
      </Card.Body>

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        className="mymodal"
        style={{ border: "none" }}
      >
        <Modal.Body
          className="mymodal "
          style={{ border: "none", backgroundColor: "transparent" }}
        >
          {action === "edit" && (
            <EditableReview revObj={revObj} onClose={handleClose} />
          )}
          {action === "del" && (
            <ReviewDel revObj={revObj} onClose={handleClose} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewCard;
