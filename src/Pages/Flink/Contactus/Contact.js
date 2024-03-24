import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React, {  useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

// import { useHistory } from 'react-router-dom';


function Contact() {
  const navigate = useNavigate();
  const [formErrors,setFormErrors]=useState({});

  const [formData, setFormdata] = useState({

    name: '',
    email: '',
    message: ''

  });

  const handeleChange = e => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();

const errors={};
if(!formData.name.trim()){
  errors.name='Name is required';
}
if(!formData.email.trim()){
  errors.email='Email is required';
}else if(!/\S+@\S+\.\S+/.test(formData.email)) {
  errors.email= 'Email is invalid';
}

if(!formData.message.trim()){
  errors.message='message is required'
}

if(Object.keys(errors).length>0){
  setFormErrors(errors);
} else{

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
navigate('/')

}

    





};
  return (
    <div className='container' style={{ minHeight: '400px' }}>
      <div className='row mx-auto w-75 mt-4 shadow rounded-4  bg-white text-dark'>
        <div className='col p-0'>
          <div
            className="prim-pg text-center text-light  p-1"
            style={{ borderRadius: "11px 11px 0px 0px" }}
          >
            <span className="fw-bold">Contact Us</span>
          </div>
          <div className='text-center fs-5 my-2'>
            <p className='pb-0 mb-0'>We will be happy to receive your inquiries and suggestions.</p>
            <hr className='w-75 mx-auto mt-0'/>
          </div>
          <div className=' mx-3'>
            <Form className='p-2' onSubmit={handleSubmit} method='post'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Full Name" value={formData.name} onChange={handeleChange} name='name'  />
                {formErrors.name &&<p style={{color:'red'}}>{formErrors.name}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" name='email' value={formData.email} onChange={handeleChange}  />
                {formErrors.email &&<p style={{color:'red'}}>{formErrors.email}</p>}

              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your Message</Form.Label>
                <Form.Control as="textarea" rows={4} name='message' value={formData.message} onChange={handeleChange}  />
                {formErrors.message &&<p style={{color:'red'}}>{formErrors.message}</p>}

              </Form.Group>
              <div className='d-flex justify-content-center mb-3 mt-1'>
                <Button type='submit' className='fw-bold rounded-3' style={{ minWidth: "120px" }}>Send</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
