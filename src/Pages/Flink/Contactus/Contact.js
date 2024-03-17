import { Button, Col, Form, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './Contact.css'
function Contact() {
  return (
    <div id='conMain' className='container-fluid border p-2 rounded-3 shadow me-3 mb-2'>
<Row>
   <div className='col lab'>
    <h3>
    Contact Us
    </h3>
<p>We will be happy to receive your inquiries and suggestions.

</p>
{/* <div className='row'>
  <Form>
<div className='col'>
<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Your Name
        </Form.Label>
        <Col sm="10">
        </Col>
      </Form.Group>
  </div>
  <div className='col'>

        <Form.Control type="text" placeholder="First Name last Name" />


  </div>

  </Form>
  

</div> */}

<Form>
<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label id='forml' column sm="2">
          Your Name
        </Form.Label>
        <Col sm="10">
        <Form.Control id='formC' type="text" placeholder="First Name last Name" />
        </Col>
      </Form.Group>
<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label id='forml' column sm="2">
          Mobile Number
        </Form.Label>
        <Col sm="10">
        <Form.Control id='formC' type="number" placeholder="Mobile Number" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label id='forml' column sm="2">
          Email Address
        </Form.Label>
        <Col sm="10">
        <Form.Control  id='formC'type="email" placeholder="email@example.com" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label  id='forml'column sm="2">
          Comments
        </Form.Label>
        <Col sm="10">
        <Form.Control  id='formC'as="textarea" rows={3} />
        </Col>
      </Form.Group>
      <Button variant="danger">Send</Button>{' '}

    </Form>


   </div>
   <div className='col col-4 lab'>
<h3>Call Us</h3>
<p>16676 Cost of regular call

</p>
<p>From outside Egypt call:<br/>
+2 02 259 83 999</p>
<h3>Address</h3>
<p>124 Othman Ibn Affan St. behind Military college - Heliopolis

</p>
<h3>Mail Us
</h3>
<p><a href="mailto:email@example.com">customercare@medcare.com</a></p>
</div>
</Row>

    </div>
  );
}

export default Contact;