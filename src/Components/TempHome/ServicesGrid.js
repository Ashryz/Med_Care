import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
    faHandHoldingMedical,
    faNewspaper,
    faUserDoctor,
    faStar
} from '@fortawesome/free-solid-svg-icons';
import './service-grid.css';
function ServicesGrid() {
    return (

        <div className="container-fluid p-0  ">
            <h2 className='text-center mb-4'>Explore</h2>
            {/* //row-cols-1 row-cols-md-3 row-cols-lg-4 */}
            <div className="row  p-3 justify-content-center"> 
                <div className='ser-card col-lg-3 col-md-4 border p-3 rounded-3 shadow me-3 mb-2'>
                    <FontAwesomeIcon icon={faHandHoldingMedical} size='2x' className='prim-color' />
                    <h4 className='mt-3'>Browse Doctors</h4>
                    <p>Book appointment with the best doctors in your city</p>
                </div>
                <div className='ser-card col-lg-3 col-md-4 border p-3 rounded-3 shadow me-3 mb-2'>
                    <FontAwesomeIcon icon={faNewspaper} size='2x' className='prim-color' />
                    <h4 className='mt-3'>Health News</h4>
                    <p>Read latest health news and articles</p>
                </div>
                <div className='ser-card col-lg-3 col-md-4 border p-3 rounded-3 shadow me-3 mb-2'>
                    <FontAwesomeIcon icon={faStar} size='2x' className='prim-color' />
                    <h4 className='mt-3'>Patient Reviews</h4>
                    <p>Read reviews of patients about doctors</p>
                </div>
                <div className='ser-card col-lg-3 col-md-4 border p-3 rounded-3 shadow me-3 mb-2'>
                    <FontAwesomeIcon icon={faUserDoctor} size='2x' className='prim-color' />
                    <h4 className='mt-3'>Book Appointment</h4>
                    <p>Book appointment with the best doctors in your city</p>
                </div>
                <div className='ser-card col-lg-3 col-md-4 border p-3 rounded-3 shadow me-3 mb-2'>
                    <FontAwesomeIcon icon={faUserDoctor} size='2x' className='prim-color' />
                    <h4 className='mt-3'>Book Appointment</h4>
                    <p>Book appointment with the best doctors in your city</p>
                </div>
                <div className='ser-card col-lg-3 col-md-4 border p-3 rounded-3 shadow me-3 mb-2'>
                    <FontAwesomeIcon icon={faUserDoctor} size='2x' className='prim-color' />
                    <h4 className='mt-3'>Book Appointment</h4>
                    <p>Book appointment with the best doctors in your city</p>
                </div>
               
            </div>
            
        </div>
    );
}

export default ServicesGrid;