import { Button, Col, Container, Row } from "react-bootstrap";
import "./ListDoctor.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faMoneyBill1Wave, faLocationDot , faPhone} from '@fortawesome/free-solid-svg-icons';

function CardSmallDoc({ doc }) {
  return (
    <Container className="my-container">
      <Row className="doc_card border p-3 rounded-3 shadow me-3 mb-2">
        <Col md={3}>
          <img id="img" src={doc.Image} alt="docimg"></img>
        </Col>
        <Col md={6}>
          <h2><span className='fs-5 sec-color'>Doctor </span>{doc.fname} {doc.lname}</h2>
          <p><span style={{color:'dodgerblue'}}><FontAwesomeIcon icon={faStethoscope} />&nbsp;</span> {doc.specialization}</p>
          <hr className="text-muted"/>
          <p><span style={{color:'dodgerblue'}}><FontAwesomeIcon icon={faLocationDot} />&nbsp;Area: </span> {doc.area}</p>
          <p><span style={{color:'dodgerblue'}}><FontAwesomeIcon icon={faMoneyBill1Wave}/>&nbsp;Fees: </span> EGP {doc.fees}</p>
          <p><span style={{color:'dodgerblue'}}><FontAwesomeIcon icon={faPhone} />&nbsp;Mobile Phone: </span> {doc.phone}</p>
        </Col>
        <Col md={3}>
        <Link to={`/DoctorDetails/${doc.id}`}>
            <Button className="btn me-2 sec-btn">Details</Button>
          </Link>
          <Button className='btn main-btn' >Booking</Button>
        </Col>
      </Row>
    </Container>
  );
}
export default CardSmallDoc;

