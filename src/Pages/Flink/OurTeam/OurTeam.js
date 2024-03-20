import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faMoneyBill1Wave,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
function OurTeam() {
  return (
    <>
      
      <Container className="container">
        <Row className=" border p-3 rounded-3 shadow me-3 mb-2">
          <Col md={2}>
            <img
              src={"img/person.jpg"}
              alt="doctor"
              className="img-fluid rounded-circle shadow-lg"
              style={{ width: "300px", height: "200px" }}
            />
          </Col>
          <Col >
          <p>
            <h2 >Mohamed Ahmed</h2>
            <span style={{ color: "dodgerblue" }}>
              <FontAwesomeIcon icon={faLocationDot} />
              &nbsp;Location:{" "}
            </span>{" "}
          </p>
          <p>
            <span style={{ color: "dodgerblue" }}>
              <FontAwesomeIcon icon={faPhone} />
              &nbsp;Mobile Phone:{" "}
            </span>{" "}
          </p>
        
            <p>
              Amir introduced Vezeeta in 2012 as a digital platform which today
              has redefined the healthcare industry in MENA. The revolutionary
              accessibility bridge between patients and doctors is creating
              unprecedentedly swift and effective healthcare experiences. Amir
              built Vezeeta from an idea to a company of 200 employees, 60,000
              monthly bookings, 6000 subscribed doctors and 1 million users
              across MENA with offices in Cairo, Jordan, Lebanon, Morocco and
              UAE. Amir’s unique entrepreneurial vision was the cornerstone for
              raising US$ 10.5 Mn in 4 years turning Vezeeta into the go-to
              portal for healthcare-related matters across MENA. Amir is an
              all-time entrepreneur; he established his first company directly
              after graduation. He successfully grew it into a well-established
             
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default OurTeam;
