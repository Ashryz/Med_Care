import React from "react";
import './main.css';

const Hero = () => {
  return (
    <div className="container-fluid p-0">
      <div className="">
        <img
          className="img-fluid"
          src="./img/hero-img.jpg"
          alt="Card"
          height={797}
          width={2020} />
        <div className="card-img-overlay d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="wider-container white-background p-4 shadow">
                  <h5 className="card-title fs-1 text-black fw-light">Search For Your Doctor</h5>
                  <button className="btn btn-primary fs-5 mt-3">Search Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
