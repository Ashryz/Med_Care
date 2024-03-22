import React, { useContext, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
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
    const { name, value, files } = e.target;
    if (name === 'image_url' && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = authContext.currentUser.id;
    axiosInstance
      .post(`/offers/doctors/${userId}/`, formData)
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
        <div className="col-md-9 mt-3 ">
          <Card >
            <Card.Header className="prim-pg text-center text-white">Add Offer</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="specialization">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Select
                    value={formData.specialization}
                    name="specialization"
                    onChange={handleChange}
                    placeholder="Select specialization"
                  >
                    <option value="">Select Specialization</option>
                    <option value="Dermatology">Dermatology (Skin)</option>
                    <option value="Dentistry">Dentistry (Teeth)</option>
                    <option value="Psychiatry">
                      Psychiatry (Mental, Emotional or Behavioral Disorders)
                    </option>
                    {/* Add other options as needed */}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="image_url">
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

                <Form.Group controlId="original_price">
                  <Form.Label>Original Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="original_price"
                    value={formData.original_price}
                    onChange={handleChange}
                    placeholder="Enter original price"
                  />
                </Form.Group>

                <Form.Group controlId="discount_price">
                  <Form.Label>Discount Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount_price"
                    value={formData.discount_price}
                    onChange={handleChange}
                    placeholder="Enter discount price"
                  />
                </Form.Group>
               <div className="text-center mt-1 ">
                <Button className=" main-btn" type="submit">
                  Add Offer
                </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AddOffer;

