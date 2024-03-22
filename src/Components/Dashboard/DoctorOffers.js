import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, Button, Pagination, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../Network/axiosInstance';
import Sidebar from './Sidebar';

function DoctorOffers() {
  const authContext = useContext(AuthContext);
  const userId = authContext.currentUser.id;

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage] = useState(4);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosInstance.get(`/offers/doctors/${userId}/`);
        setOffers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setError('Error fetching offers. Please try again later.');
        setLoading(false);
      }
    };
    fetchOffers();
  }, [userId]);

  const handleEdit = (offerId) => {
    console.log('Edit offer with ID:', offerId);
  };

  const handleDelete = async (offerId) => {
    try {
      await axiosInstance.delete(`/offers/doctors/${userId}/${offerId}/`);
      setOffers(offers.filter(offer => offer.id !== offerId));
    } catch (error) {
      console.error('Error deleting offer:', error);

    }
  };

  // Pagination Logic
  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : offers.length === 0 ? (
        <p>No offers available for this doctor</p>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9 mt-3">
              <h2>Your Offers ({offers.length})</h2>
              <Row>
                {currentOffers.map((offer) => (
                  <Col key={offer.id} lg={3} md={6} sm={12} className="mb-3">
                    <Card style={{ width: '100%' }}>
                      <Card.Img variant="top" src={`http://localhost:8000${offer.image_url}`} />
                      <Card.Body>
                        <Card.Title>{offer.specialization}</Card.Title>
                        <Card.Text>
                          Original Price: {offer.original_price} EGP
                          <br />
                          Discount Price: {offer.discount_price} EGP
                        </Card.Text>
                        <Button variant="primary" onClick={() => handleEdit(offer.id)}>
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </Button>{' '}
                        <Button variant="danger" onClick={() => handleDelete(offer.id)}>
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Pagination className="justify-content-center">
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(Math.ceil(offers.length / offersPerPage)).keys()].map((number) => (
                  <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                    {number + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(offers.length / offersPerPage)} />
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorOffers;

