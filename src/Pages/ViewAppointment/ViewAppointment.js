import { CardAppointment } from "../../Components/ViewAppointment/CardAppointment";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
// import { Link } from "react-router-dom";

export const ViewAppointment = () => {
    const [appointments, setappointments] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        axios.get(`https://retoolapi.dev/8LxhW1/appointment?_page=${currentPage}&_limit=3`)
            .then((res) => {
                setappointments(res.data);
                setTotalPages(Math.ceil(res.headers["x-total-count"] / 10))
                console.log(res)
            })
            .catch((err) => console.log(err))
    }, [currentPage])
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container">
            <div className="row">
              
                <div className="mb-3 ">
                    {
                        appointments.map((appointment) => {
                            return (
                                <div key={appointment.id}>
                                    <CardAppointment appointment={appointment} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>


            <Pagination className="mt-3 justify-content-center">
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
            </Pagination>
        </div>

    );


}