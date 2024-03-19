// src/components/AppointmentsCard.js
import React, { useEffect, useState } from "react";
import {  Card } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { axiosInstance } from "../../Network/axiosInstance";
// import { useSelector } from 'react-redux';

const SchadulesCard = (props) => {
  const { schedule } = props;
  console.log("===============the schedual=====================");
  console.log(schedule);
  console.log("====================================");

  // const appointments = useSelector((state => state.combineSchadule.appointments))
  const handleDelete = () => {
    axiosInstance.delete(`/schedules/schedule/${schedule.id}/`)
    .then((response) => {
      console.log(response.data);

    }
    );
  };

  return (
    <>
      <Card
        className="rounded-3 shadow "
        style={{
          backgroundImage:
            "linear-gradient(to bottom,MediumSeaGreen 130px , dodgerBlue 250px )",
        }}
      >
        <Card.Body>
          <h5 class="card-title text-center">Schedule ( {schedule.id} ) </h5>
          <hr />
          <div className="px-2 ">
            <div className="d-flex">
              <span className="fs-5  ">Day :</span>
              <span className="ms-2 fs-5 text-muted"> {schedule.day}</span>
            </div>
            <div className="d-flex">
              <span className="fs-5 ">Start Time :</span>
              <span className="ms-2 fs-5 text-muted">
                {" "}
                {schedule.start_time}
              </span>
            </div>
            <div className="d-flex">
              <span className="fs-5 ">End Time :</span>
              <span className="ms-2 fs-5 text-muted"> {schedule.end_time}</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="mx-3 d-flex justify-content-between align-items-center">
              <PencilFill className="pencil fs-5 " onClick={handleDelete} />

              <TrashFill className="trash fs-5" />
            </div>
          </div>
          {/* <div className='d-flex'>
          <NavLink to={'/Schadule'} className='btn main-btn text-decoration-none mx-auto position-relative '>My Appointment
            <span class=" position-absolute top-0 start-25 translate-middle badge rounded-pill bg-danger ">{appointments.length}</span>
          </NavLink>
        </div> */}
        </Card.Body>
      </Card>
    </>
  );
};

export default SchadulesCard;
