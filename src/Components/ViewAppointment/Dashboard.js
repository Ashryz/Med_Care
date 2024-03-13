// src/components/Dashboard.js

import { Container } from "react-bootstrap";
import AppointmentsCard from "./AppointmentsCard";
import RatingsCard from "./RatingsCard";

import { ViewAppointment } from "../../Pages/ViewAppointment/ViewAppointment";

const Dashboard = () => {
  // Mock data, replace with actual API fetch
  // const numberOfAppointments = 25;
  const averageRating = 4.7;

  return (
    <Container fluid className="justify-content-center">
      <div className="row ">
        <h2 className="text-center text-muted">Doctor Dashboard</h2>
        <hr className="w-75 mx-auto"></hr>
        <div className="col-md-4">
          <div className="mb-2">
            <AppointmentsCard />
          </div>
          <div>
            <RatingsCard averageRating={averageRating} />
          </div>
          {/* <div>
              <h3 className='text-center text-muted'>Statictics</h3>
              <hr className='w-75 mx-auto'></hr>
              <p className='text-center text-muted'>
                You have 25 appointments this month
              </p>
              <p className='text-center text-muted'>
                You have 5 appointments today
              </p>
              <p className='text-center text-muted'>
                You have 3 appointments tomorrow
              </p>
              <p className='text-center text-muted'>
                You have 2 appointments next week
              </p>
            </div> */}
        </div>
        <div className="col-md-8">
          <ViewAppointment />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
