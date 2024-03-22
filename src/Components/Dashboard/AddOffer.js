import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { axiosInstance } from '../../Network/axiosInstance';
import { AuthContext } from '../../context/AuthContext';

function AddOffer() {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
    specialization: '',
    image_url: '',
    original_price: '',
    discount_price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const userId = authContext.currentUser.id;
  axiosInstance.post(`/offers/doctors/${userId}/`, formData)
    .then((response) => {
      console.log('Offer added successfully');
      // Redirect to another page after successful addition if needed
    })
    .catch((error) => {
      console.error('Error adding offer:', error);
    });
};


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9 mt-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="specialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Enter specialization"
              />
            </Form.Group>

	 <Form.Group className="mb-3" controlId="image_url">
	  <Form.Label>Image File</Form.Label>
	  <Form.Control
	    type="file"
	    accept="image/*"
	    name="image_url"
	    onChange={(e) => {
	      const file = e.target.files[0];
	      setFormData({ ...formData, image_url: file });
	    }}
	  />
	</Form.Group>


            <Form.Group className="mb-3" controlId="original_price">
              <Form.Label>Original Price</Form.Label>
              <Form.Control
                type="number"
                name="original_price"
                value={formData.original_price}
                onChange={handleChange}
                placeholder="Enter original price"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="discount_price">
              <Form.Label>Discount Price</Form.Label>
              <Form.Control
                type="number"
                name="discount_price"
                value={formData.discount_price}
                onChange={handleChange}
                placeholder="Enter discount price"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Offer
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddOffer;

