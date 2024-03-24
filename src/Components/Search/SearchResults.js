import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Filter from "../Filter/Filter";
import CardSmallDoc from "../CardDoctor/CardSmallDoc";
import { getDoctorsList } from '../../Store/Actions/Actions';
import SearchBar from "./searchbar";

function SearchResults() {
    const { query } = useParams();
    const dispatch = useDispatch();
    const doctors = useSelector((state) => state.combineDoctors.doctors);
    const pageSize = 5
    const totalPages = Math.ceil((doctors.count ?? 0) / pageSize);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getDoctorsList(currentPage, pageSize, query));
    }, [dispatch, currentPage, pageSize, query]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Container fluid className="mt-5 mb-5" style={{minHeight:'22.4rem'}}>
            <Row>
                {/* <Col md={3} className="d-none d-xl-block">
                    <Filter />
                </Col> */}
                    {doctors.results?.length === 0 && <h3 className="text-center">No doctors found for "{query}"</h3>}
                    {doctors.results?.length > 0 && (
                        <>
                            <Row className="row-cols-1 g-4">
                                {doctors.results.map((doctor) => (
                                    <CardSmallDoc key={doctor.user.id} doc={doctor} />
                                ))}
                            </Row>
                            <Pagination className="mt-3 justify-content-center">
                                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1}/>
                                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}/>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index + 1 === currentPage}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}/>
                                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}/>
                            </Pagination>
                        </>
                    )}
            </Row>
        </Container>
    );
}

export default SearchResults;

