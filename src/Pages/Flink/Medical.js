import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Medical.css";
function Midical() {
  return (
    <div id="main" className="container-fluid ">
      <Card
        id="card"
        style={{ width: "20rem" }}
        className=" border p-2 rounded-3 shadow me-3 mb-2"
      >
        <div>
          <Card.Img src="img/m1.jpeg" />
        </div>
        <div>
          <Card.Body>
            <Card.Title>Medical Questions</Card.Title>
            <Card.Text>
              Do you need quick and reliable answers to your medical questions?
              Access a wealth of medical Qs & As covering a wide range of health
              topics. Don't wait to get the medical advice you need
            </Card.Text>
            {/* <Button id='btn1' variant="primary">Detailes</Button> */}
          </Card.Body>
        </div>
      </Card>
      <Card
        id="card"
        style={{ width: "20rem" }}
        className=" border p-2 rounded-3 shadow me-3 mb-2"
      >
        <div>
          <Card.Img variant="" src="img/m2.jpeg" />
        </div>
        <div>
          <Card.Body>
            <Card.Title>Diseases & Conditions</Card.Title>
            <Card.Text>
              Looking for reliable information on diseases? it's never been
              easier to access valuable and up-to-date pages on a wide range of
              health conditions.Your Health is Our Priority Keep it
            </Card.Text>
            {/* <Button id='btn' variant="primary">Detailes</Button> */}
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}

export default Midical;
