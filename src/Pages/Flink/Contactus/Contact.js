import { Button, Col, Form, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";

import './Contact.css'
function Contact() {
  const [formData,setFormdata]=useState({

name:'',
email:'',
message:''

  });

  const handeleChange=e=>{
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
        const response = await fetch('http://127.0.0.1:8000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        // Handle success or error
    } catch (error) {
        console.error('Error:', error);
    }
    setFormdata({
      name: '',
      email: '',
      message:''
      // Reset other fields as needed
    });

};
  return (
    <div id='conMain' >
<Row>
   <div className='col lab'>
    <h3>
    Contact Us
    </h3>
<p>We will be happy to receive your inquiries and suggestions.

</p>


<Form onSubmit={handleSubmit} method='post'>
<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label id='forml' column sm="2">
          Your Name
        </Form.Label>
        <Col sm="10">
        <Form.Control name='name' id='formC' value={formData.name} onChange={handeleChange} type="text" required={true} placeholder="First Name last Name" />
        </Col>
      </Form.Group>
{/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label id='forml' column sm="2">
          Mobile Number
        </Form.Label>
        <Col sm="10">
        <Form.Control id='formC' type="number" placeholder="Mobile Number" />
        </Col>
      </Form.Group> */}
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label id='forml' column sm="2">
          Email Address
        </Form.Label>
        <Col sm="10">
        <Form.Control name='email' value={formData.email} onChange={handeleChange} id='formC'type="email"required={true}placeholder="email@example.com" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label  id='forml'column sm="2">
          Comments
        </Form.Label>
        <Col sm="10">
        <Form.Control name='message' value={formData.message} onChange={handeleChange} required={true} id='formC'as="textarea" rows={3} />
        </Col>
      </Form.Group>
      <Button type='submit'  variant="danger">Send</Button>{' '}

    </Form>


   </div>
   <div className='col col-4 lab'>
<h3>Call Us</h3>
<p>0244625637 Cost of regular call

</p>
<p>From outside Egypt call:<br/>
01069433663</p>
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