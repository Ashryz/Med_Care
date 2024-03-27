import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, Button, Pagination, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../Network/axiosInstance';
import Sidebar from './Sidebar';
import './Offer.css';
import { useNavigate } from 'react-router-dom';

function DoctorOffers() {
  const authContext = useContext(AuthContext);
  const userId = authContext.currentUser.id;

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage] = useState(3);

  const currentUser = authContext.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);


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

  const handleDelete = async (offerId) => {
    try {
      await axiosInstance.delete(`/offers/doctors/${userId}/${offerId}/`);
      setOffers(offers.filter(offer => offer.id !== offerId));
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading ? (
        <p className="prim-color d-flex justify-content-center align-items-center " style={{ minHeight: '40.4vh' }}>Loading...</p>
      ) : error ? (
        <p className="prim-color d-flex justify-content-center align-items-center " style={{ minHeight: '40.4vh' }}>{error}</p>
      ) : (
        <div className="container-fluid" style={{ minHeight: "75vh" }}>
          <div className="row">
            <div className="col-md-3 mt-3">
              <Sidebar />
            </div>
            <div className="col-md-9 mt-4 text-center prim-color" style={{ minHeight: '40.4vh' }}>
              <h2>Your Offers ({offers.length})</h2>
              {offers.length === 0 ? (
                <p>No offers available </p>
              ) : (
                <>
                  <Row>
                    {currentOffers.map((offer, index) => (
                      <Col key={offer.id} lg={4} md={6} className="mb-3 mt-3">
                        <Card className="offer-card1">
                          <div className="btn main-btn" style={{ position: 'absolute', top: 0, left: 0, padding: '5px' }}>
                            {calculateDiscount(offer.original_price, offer.discount_price)}% Off
                          </div>
                          <Card.Img variant="top" src={`http://localhost:8000${offer.image_url}`} />
                          <Card.Body>
                            <Card.Title className="mt-2">{offer.specialization}</Card.Title>
                            <div className="mt-2"><span className="prim-color">Dr.</span> {offer.doctor_name}</div>
                            <div className="price">
                              <div className="original-price">{offer.original_price} EGP</div>
                              <div className="prim-color">{offer.discount_price} EGP </div>
                            </div>
                            <div className="mt-3">
                              <Button variant="danger" onClick={() => handleDelete(offer.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Pagination className="justify-content-center ">
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(Math.ceil(offers.length / offersPerPage)).keys()].map((number) => (
                      <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                        {number + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(offers.length / offersPerPage)} />
                  </Pagination>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function calculateDiscount(original_price, discount_price) {
  return Math.round(((original_price - discount_price) / original_price) * 100);
}

export default DoctorOffers;

