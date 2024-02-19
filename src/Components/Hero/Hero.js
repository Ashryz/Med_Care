import React from "react";
import docimg from '../../img/hero-img.jpg';
import { Link } from "react-router-dom";
import './hero.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
const Hero = () => {
  return (

    <header className='container-fluid p-0'>
      <div
        className=' text-center bg-image'
        style=
        {{
          backgroundImage: `url(${docimg})`,
          backgroundSize: 'cover',
          height: '40vh'
        }}
      >
        <div className='mask w-100 h-100 ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>

          <div className='d-flex justify-content-center align-items-center h-100'>

            <div className='text-white'>
              <h1 className="hero-text">Your Health is Our Priority <FontAwesomeIcon icon={faHeartPulse} className="text-light" /></h1>
              <h1 className='mb-3 sec-color'>
                <span className="prim-color">Med</span>
                <span className="sec-color">Care</span>
              </h1>

              <div className='d-flex justify-content-center'>
                <Link to='/SignUp' className='btn main-btn btn-lg me-4'>Sign Up</Link>
                <Link to='/SignIn' className='btn sec-btn btn-lg'>Login</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>



  );
};

export default Hero;
