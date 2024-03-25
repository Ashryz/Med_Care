import React, { useEffect, useState,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import './style.css';
import SchadulesCard from '../ViewAppointment/SchedulesCard';
import { axiosInstance } from '../../Network/axiosInstance';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ViewSchedule() {
  const [schedules, setSchedules] = useState([]);
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    axiosInstance.get(`/schedules/all_sch/doctor/${userId}/`)
      .then((res) => {
        setSchedules(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="App" style={{minHeight: "75vh"}}>
        <div className="container-fluid">
          <div className="row">
            <hr />
            <div className="side col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9 mt-3">
              {schedules.length === 0 ? (
                <div className="text-center">
                  <h1 className=""><i className="bi bi-calendar me-2"></i><br />No Schedules Found</h1>
                  <hr className="w-75 mx-auto sec-color shadow rounded-5" />
                </div>
              ) : (
                <div className='row d-flex'>
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className='col-md-3'>
                      <SchadulesCard
                        schedule={schedule}
                        schedules={schedules}
                        setSchedules={setSchedules}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewSchedule;

