import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OfferSlider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance } from "../../Network/axiosInstance";

function OfferSlider() {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numVisibleOffers, setNumVisibleOffers] = useState(4);
  const [error, setError] = useState(null); // State to track error

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosInstance.get('offers/doctors/');
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setError('Error fetching offers. Please try again later.'); // Set error state
      }
    };
    fetchOffers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setNumVisibleOffers(4);
      } else if (screenWidth >= 992) {
        setNumVisibleOffers(3); // Set to 3 for medium screens
      } else if (screenWidth >= 768) {
        setNumVisibleOffers(2);
      } else {
        setNumVisibleOffers(1);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, offers.length - numVisibleOffers));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const maxIndex = offers.length - numVisibleOffers;
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= maxIndex;

  const visibleOffers = offers.slice(currentIndex, currentIndex + numVisibleOffers);

  return (
    <div>
      <h2 className="text-center mb-4 mt-4"> Offers</h2>
      <div className="container-fluid mt-3">
        {error ? ( // Check if there's an error

          <div className="error-message text-center prim-color ">{error}</div>

        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <div className="m-5">
              <button onClick={handlePrev} className="slider-nav prev btn main-btn" disabled={isPrevDisabled}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            </div>
		<div className="offer-slider row" style={{ '--numVisibleOffers': numVisibleOffers }}>
		  {offers.length === 0 ? (
		    <div className=" prim-color">No offers available</div>
		  ) : (
		    visibleOffers.map((offer, index) => (
		      <div key={index} className={`offer-card mb-4 bg-light col-md-${12 / numVisibleOffers}`}>
			<div className="btn main-btn discount-label">{calculateDiscount(offer.original_price, offer.discount_price)}% Off</div>
			<img className="offer-image" src={`http://localhost:8000${offer.image_url}`} alt={offer.specialization} />
			<div className="offer-details">
			  <h3 className="offer-title">{offer.specialization}</h3>
			  <div className="doctor-name"><span className="prim-color">Dr.</span> {offer.doctor_name}</div>
			  <div className="offer-price">
			    <span className="original-price">{offer.original_price}EGP</span>
			    <span className="prim-color">{offer.discount_price}EGP</span>
			  </div>
			</div>
		      </div>
		    ))
		  )}
		</div>

            <div className="m-5">
              <button onClick={handleNext} className="slider-nav next btn main-btn" disabled={isNextDisabled}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function calculateDiscount(original_price, discount_price) {
  return Math.round(((original_price - discount_price) / original_price) * 100);
}

export default OfferSlider;
 
