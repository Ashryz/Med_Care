import { Button, Col, Container, Row } from "react-bootstrap";
import "./ListDoctor.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faMoneyBill1Wave,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

function CardSmallDoc({ doc }) {
  console.log(doc);
  return (
    <Container className="my-container">
      <Row className="doc_card border p-3 rounded-3 shadow me-3 mb-2">
        <Col md={2}>
          <img
            id="img"
            src={`http://localhost:8000${doc.user.img}`}
            alt="doctor"
            className="img-fluid rounded-circle shadow-lg"
            style={{ width: "100px", height: "100px" }}
          />
        </Col>
        <Col md={6}>
          <h2>
            <span className="fs-5 sec-color">Doctor </span>
            {doc.user.first_name} {doc.user.last_name}
          </h2>
          <p>
            <span style={{ color: "dodgerblue" }}>
              <FontAwesomeIcon icon={faStethoscope} />
              &nbsp;
            </span>{" "}
            {doc.specialization}
          </p>
          <hr className="text-muted" />
          <p>
            <span style={{ color: "dodgerblue" }}>
              <FontAwesomeIcon icon={faLocationDot} />
              &nbsp;Area:{" "}
            </span>{" "}
            {doc.area}
          </p>
          <p>
            <span style={{ color: "dodgerblue" }}>
              <FontAwesomeIcon icon={faMoneyBill1Wave} />
              &nbsp;Fees:{" "}
            </span>{" "}
            EGP {doc.fees}
          </p>
          <p>
            <span style={{ color: "dodgerblue" }}>
              <FontAwesomeIcon icon={faPhone} />
              &nbsp;Mobile Phone:{" "}
            </span>{" "}
            {doc.user.phone}
          </p>
        </Col>
        <Col
          md={4}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <Link to={`/DoctorDetails/${doc.user.id}`}>
            <Button className="btn me-2 sec-btn">Details</Button>
          </Link>
          
        </Col>
      </Row>
    </Container>
  );
}
export default CardSmallDoc;
