import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import ServicesGrid from './ServicesGrid'
import {
    faArrowRight,
    faUserDoctor
} from '@fortawesome/free-solid-svg-icons'

function TempHome() {
    return (
        <div className="container-fluid p-5">
            <div className="row mb-2">
                <h1 className="text-center">Our Services</h1>
            </div>
            <div className="row p-3 rounded-3 border shadow-lg mb-5">
                <div className="col-12 col-md-9">
                    <h4>Book Appointment with Doctor</h4>
                    <p>Book appointment with the best doctors in your city <FontAwesomeIcon icon={faUserDoctor} /></p>
                </div>
                <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
                    <Link to='/Listdoctor' className='btn main-btn btn-lg shadow'>
                        Book Now <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </div>
            </div>
            <ServicesGrid />
        </div>
    )
}

export default TempHome