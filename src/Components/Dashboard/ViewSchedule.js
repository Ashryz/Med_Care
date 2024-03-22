import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import './style.css';
import SchadulesCard from '../ViewAppointment/SchedulesCard';
import { axiosInstance } from '../../Network/axiosInstance';

function ViewSchedule() {
    const [schedules, setschedules] = useState([])
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        axiosInstance.get(`/schedules/all_sch/doctor/${userId}/`)
            .then((res) => {
                setschedules(res.data);
                console.log(res)
            })
            .catch((err) => console.log(err))
    }, [refresh])
    console.log(schedules.Results)
    return (
        <>
            <div className="App"
                style={{ minHeight: "75vh" }}>

                <div className="container-fluid">
                    <div className="row">
                        <hr />
                        <div className="side col-md-3">
                            <Sidebar />
                        </div>

                        <div className="col-md-9 mt-3">
                            {schedules.length === 0 ? (
                                <div className="text-center">
                                    <h1 className="text-muted"><i className="bi bi-calendar me-2"></i><br/>No Schedules Found</h1>
                                    <hr className="w-75 mx-auto sec-color shadow rounded-5" />
                                </div>
                            ) : (
                                <div className='row d-flex'>
                                    {schedules.map((schedule) => (
                                        <div key={schedule.id} className='col-md-3'>
                                            <SchadulesCard schedule={schedule} refresh={refresh} setRefresh={setRefresh} />
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