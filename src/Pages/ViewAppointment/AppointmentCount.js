
import React from 'react';

const AppointmentCount = ({ appointments }) => {
  return (
    <div>
      <p>Total Appointments: {appointments.length}</p>
    </div>
  );
};

export default AppointmentCount;


