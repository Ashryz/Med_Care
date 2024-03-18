import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import './style.css';
import SchadulesCard from '../ViewAppointment/SchedulesCard';
import { axiosInstance } from '../../Network/axiosInstance';

function ViewSchedule() {
    const [schedules, setschedules] = useState([])
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        axiosInstance.get("/schedules/all_sch/doctor/2/")
            .then((res) => {
                setschedules(res.data);
                // setTotalPages(Math.ceil(res.headers["x-total-count"] / 10))
                console.log(res)
            })
            .catch((err) => console.log(err))
    }, []) //currentPage
    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    // };
    return (
        <>
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        <hr />
                        <div className="side col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className='row' >
                                <div className="col-md-4">
                                    {
                                        schedules.map((schedule) => {
                                            return (
                                                <div key={schedule.id}>
                                                    <SchadulesCard schedule={schedule} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>



                            {/* <Pagination className="mt-3 justify-content-center">
                <Pagination.First onClick={() => handlePageChange(1)} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination> */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ViewSchedule;