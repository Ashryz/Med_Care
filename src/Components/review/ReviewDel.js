import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { axiosInstance } from "../../Network/axiosInstance";

function ReviewDel({ revObj, onClose ,refresh}) {

  const [deleted , setDeleted] = useState(false);

  const handleSubmit = () => {
    axiosInstance.delete(`/ratings/${revObj.id}/`).then((response) => {
      setDeleted(true);
      refresh()
    }
    );
    onClose();
  }

  useEffect(() => {}, [revObj]);


  return (
    <div
      className="light-bg border rounded-3 "
      style={{ position: "relative", maxWidth: "400px", margin: "0 auto" }}
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
                <span className="bg-danger badge rounded-pill text-light">
                  !
                </span>
                <span className="ms-2 fs-8 text-light">Delete Review</span>
              </p>
            </div>
          </div>
        </Row>

        <Row className="justify-content-center m-0 p-3">
          <div className="col-md-12">
            <Row className="align-items-center m-0 p-3 justify-content-center mt-2">
              <p className="text-center">
                Are you sure you want to delete this review?
              </p>
              <div className="col-sm-6 text-center">
                <Button
                  className="btn main-btn rounded-5 shadow-lg p-2"
                  style={{ width: "80%", fontSize: "1rem" }}
                  onClick={handleSubmit}
                >
                  Delete
                </Button>
              </div>
              <div className="col-sm-6 text-center mt-2 mt-sm-0">
                <Button
                  className="btn sec-btn rounded-5 shadow-lg p-2"
                  style={{ width: "80%", fontSize: "1rem" }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </div>
            </Row>
          </div>
        </Row>
      </Card.Body>
    </div>
  );
}

export default ReviewDel;
