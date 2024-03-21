import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { AuthContext } from '../../context/AuthContext';

function Sidebar() {
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  if (currentUser.is_doctor) {
    return (
      <div className='list-group-wrapper '>

        <ListGroup className='list-group listStyle m-3 col border border-light'>

          <Link to="/Dashboard" className="text-decoration-none">
            <ListGroup.Item className='list-group-item listgroupItem prim-pg text-white'>
              <i className="bi bi-speedometer2"></i>
              <span className='spanStyle'>Dashboard</span>
            </ListGroup.Item>
<<<<<<< HEAD
          <Link to="/MainDashboard" className="text-decoration-none">
            <ListGroup.Item className='list-group-item listgroupItem lis'>
              <i className="bi bi-file-earmark-text me-2"></i>
              <span className='spanStyle'>Report</span>
            </ListGroup.Item>
=======
>>>>>>> dashboard
          </Link>
          <Link to="/Appointments" className="text-decoration-none">
            <ListGroup.Item className='list-group-item listgroupItem lis'>
              <i className="bi bi-table me-2"></i>
              <span>Appointments</span>
            </ListGroup.Item>
          </Link>
          <Link to="/AddSchedule" className="text-decoration-none">
            <ListGroup.Item className='list-group-item listgroupItem lis'>
              <i className="bi bi-calendar me-2"></i>
              <span>Add Schedule</span>
            </ListGroup.Item>
          </Link>
          <Link to="/ViewSchedule" className="text-decoration-none">
            <ListGroup.Item className='list-group-item listgroupItem lis'>
              <i className="bi bi-calendar2 me-2"></i>
              <span>View Schedule</span>
            </ListGroup.Item>
          </Link>
          <Link to="/Rating" className="text-decoration-none">
            <ListGroup.Item className='list-group-item listgroupItem lis'>
              <i className="bi bi-star me-2"></i>
              <span>Rating</span>
            </ListGroup.Item>
          </Link>
        </ListGroup>
      </div>
    );
  }
  else {
    return (
      <div className='list-group-wrapper '>
        <ListGroup className='list-group listStyle m-3 col border border-light'>

          <ListGroup.Item className='list-group-item listgroupItem prim-pg text-white'>
            <i className="bi bi-speedometer2"></i>
            <span className='spanStyle'>Dashboard</span>
          </ListGroup.Item>



          <Link to="/Appointments" className="text-decoration-none">
            <ListGroup.Item className='list-group-item listgroupItem lis'>
              <i className="bi bi-table me-2"></i>
              <span>Appointments</span>
            </ListGroup.Item>
          </Link>

        </ListGroup>
      </div>
    );
  }

}

export default Sidebar;
