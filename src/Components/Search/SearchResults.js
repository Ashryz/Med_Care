import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Filter from "../Filter/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faMoneyBill1Wave, faLocationDot } from '@fortawesome/free-solid-svg-icons';

function SearchResults() {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const capFL = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        axios.get(`https://retoolapi.dev/46yPXc/doctors?fname=${capFL(query)}&_page=${currentPage}&_limit=5`)
            .then((res) => {
                    console.log(res.data)
                    setSearchResults(res.data);
                    setTotalPages(Math.ceil(res.headers["x-total-count"] / 5));
                    console.log(res)
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
            });
    }, [query, currentPage]);
    console.log(searchResults);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Container fluid className="mt-5 mb-5">
        {/* <h1 className="text-center text-primary fw-bold mt-3 mb-5">Your Searched for {query}</h1> */}
        <Row >
            <Col md={3} className="d-none d-xl-block">
                <Filter />
            </Col>
            <Col md={9}>
                    <Row className="row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {searchResults.map((doctor) => (
                            <Col key={doctor.id}>
                                <Card style={{height:'13rem'}}>
                                    <Card.Body>
                                        <Card.Title className="text-center fs-2">{doctor.fname} {doctor.lname}</Card.Title>
                                        <Card.Text><span style={{color:'dodgerblue'}}><FontAwesomeIcon icon={faStethoscope} />&nbsp;Speciality: </span> {doctor.specialization}</Card.Text>
                                        <Card.Text><span style={{color:'dodgerblue'}}><FontAwesomeIcon icon={faLocationDot} />&nbsp;Area: </span> {doctor.area}</Card.Text>
                                        <Card.Text><span style={{color:'dodgerblue'}}><FontAwesomeIcon icon={faMoneyBill1Wave}/>&nbsp;Fees: </span> EGP {doctor.fees}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
            </Col>
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
        </Row>
    </Container>
    );
}

export default SearchResults;

