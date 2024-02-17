import React from "react";
import './main.css';

const Home = () => {
  return (
    <div className="hero border-1 pb-3">
      <div className="card bg-dark text-white border-0 mx-3">
        <img
          className="card-img img-fluid"
          src="./img/doctor4.jpeg"
          alt="Card"
          height={797}
          width={2020}/>
        <div className="card-img-overlay d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="wider-container white-background p-4">
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

export default Home;
