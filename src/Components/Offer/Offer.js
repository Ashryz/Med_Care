import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OfferSlider.css';
// import sa from'../../img/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
// import com from '../../img/'
//C:\Users\mahre\Desktop\midcear\Med_Care\src\img
//C:\Users\mahre\Desktop\midcear\Med_Care\src\Components\Offer\Offer.js
function OfferSlider() {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const visibleOffers = offers.slice(currentIndex, currentIndex + 4);

  return (
    <div>
      <h2 className="text-center mb-4 mt-4"> Offers</h2>
      <div className="container-fluid mt-3">
        <div className="d-flex justify-content-between align-items-center">
        <div className="m-5">
          <button onClick={handlePrev} className="slider-nav prev btn main-btn"> <FontAwesomeIcon icon={faChevronLeft} /></button>
        </div>
          <div className="offer-slider">
            {visibleOffers.map((offer, index) => (
              <div key={index} className="offer-card mb-4 bg-light">
                <div className="btn main-btn discount-label">{calculateDiscount(offer.originalPrice, offer.discountPrice)}% Off</div>
                <img className="offer-image" src={"img/"+ offer.imageUrl} alt={offer.specialty} />
                {/* {`../../img/${offer.imageUrl}`} */}
                {/* {"../../img/"+offer.imageUrl} */}
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
          <button onClick={handleNext} className="slider-nav next btn main-btn "><FontAwesomeIcon icon={faChevronRight} /></button>
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

