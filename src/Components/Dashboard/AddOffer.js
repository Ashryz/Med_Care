import React, { useContext, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import { axiosInstance } from '../../Network/axiosInstance';
import { AuthContext } from '../../context/AuthContext';
import { faGraduationCap, faImage, faMoneyBillAlt, faTags } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function AddOffer() {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
    specialization: '',
    image_url: '',
    original_price: '',
    discount_price: '',
  });
  const [errors, setErrors] = useState({
    original_price: false,
    discount_price: false,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image_url' && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === 'original_price' && value <= 200) {
        setErrors({ ...errors, original_price: true });
      } else if (name === 'discount_price') {
        if (value <= 20 || parseFloat(value) >= parseFloat(formData.original_price)) {
          setErrors({ ...errors, discount_price: true });
        } else {
          setErrors({ ...errors, discount_price: false });
        }
      } else {
        setErrors({ ...errors, [name]: false });
      }
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.original_price <= 200 || formData.discount_price <= 20 || formData.discount_price >= formData.original_price) {
      setErrors({
        original_price: formData.original_price <= 200,
        discount_price: formData.discount_price <= 20 || formData.discount_price >= formData.original_price,
      });
      return;
    }
    const userId = authContext.currentUser.id;
    axiosInstance
      .post(`/offers/doctors/${userId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log('Offer added successfully');
        setSuccessMessage('Offer added successfully');
        navigate("/DoctorOffers");
        // Clear form data
        setFormData({
          specialization: '',
          image_url: '',
          original_price: '',
          discount_price: '',
        });
        // Reset error state
        setErrors({
          original_price: false,
          discount_price: false,
        });
      })
      .catch((error) => {
        console.error('Error adding offer:', error);
      });
  };

  return (
    
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 mt-3">
            <Sidebar />
          </div>
          <div className="col-md-9 mt-4">
            <Card className='w-75 mx-auto   '>
              <Card.Header className="prim-pg text-center text-white">Add Offer</Card.Header>
              <Card.Body>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="specialization">
                    <Form.Label className="text-primary"> <FontAwesomeIcon icon={faGraduationCap} />Specialization</Form.Label>
                    <Form.Select
                      value={formData.specialization}
                      name="specialization"
                      onChange={handleChange}
                      placeholder="Select specialization"
                    >
                      <option value="">Select Specialization</option>
                      <option value="Dermatology">Dermatology (Skin)</option>
                      <option value="Dentistry">Dentistry (Teeth)</option>
                      <option value="Psychiatry">Psychiatry (Mental, Emotional or Behavioral Disorders)</option>
                      <option value="ChestRespiratory"> Chest and Respiratory  </option>
                      <option value="Hepatology"> Hepatology (Liver Doctor)</option>
                      <option value="Obesity">
                        Obesity and Laparoscopic Surgery
                      </option>
                      <option value="Oncology">Oncology (Tumor)</option>
                      <option value="OncologySurgery">
                        Oncology Surgery (Tumor Surgery)
                      </option>
                      <option value="Ophthalmology">
                        Ophthalmology (Eyes)
                      </option>
                      <option value="Osteopathy">
                        Osteopathy (Osteopathic Medicine)
                      </option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="image_url">
                    <Form.Label className="text-primary"><FontAwesomeIcon icon={faImage} className="me-2" />Image File</Form.Label>
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
                    <Form.Label className="text-primary"><FontAwesomeIcon icon={faMoneyBillAlt} className="me-2" />Original Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="original_price"
                      value={formData.original_price}
                      onChange={handleChange}
                      placeholder="Enter original price"
                      isInvalid={errors.original_price}
                    />
                    <Form.Control.Feedback type="invalid">Original price must be greater than 200</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="discount_price">
                    <Form.Label className="text-primary"><FontAwesomeIcon icon={faTags} className="me-2" />Discount Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="discount_price"
                      value={formData.discount_price}
                      onChange={handleChange}
                      placeholder="Enter discount price"
                      isInvalid={errors.discount_price}
                    />
                    <Form.Control.Feedback type="invalid">Discount price must be greater than 20 and less than original price</Form.Control.Feedback>
                  </Form.Group>

                  <div className="text-center mt-3">
                    <Button className="main-btn" type="submit">
                      <FontAwesomeIcon icon={faPlus} className="me-2" />
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

