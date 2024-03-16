import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OfferSlider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function OfferSlider() {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numVisibleOffers, setNumVisibleOffers] = useState(4);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('https://retoolapi.dev/MAno2q/offer');
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
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
        <div className="d-flex justify-content-between align-items-center">
          <div className="m-5">
            <button onClick={handlePrev} className="slider-nav prev btn main-btn" disabled={isPrevDisabled}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </div>
          <div className="offer-slider row">
            {visibleOffers.map((offer, index) => (
              <div key={index} className={`offer-card mb-4 bg-light col-md-${12 / numVisibleOffers}`}>
                <div className="btn main-btn discount-label">{calculateDiscount(offer.originalPrice, offer.discountPrice)}% Off</div>
                <img className="offer-image" src={"img/" + offer.imageUrl} alt={offer.specialty} />
                <div className="offer-details">
                  <h3 className="offer-title">{offer.specialty}</h3>
                  <div className="offer-price">
                    <span className="original-price">{offer.originalPrice}EGP</span>
                    <span className="prim-color">{offer.discountPrice}EGP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-5">
            <button onClick={handleNext} className="slider-nav next btn main-btn" disabled={isNextDisabled}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateDiscount(originalPrice, discountPrice) {
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
}

export default OfferSlider;

