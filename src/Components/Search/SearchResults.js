import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Filter from "../Filter/Filter";

function SearchResults() {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        axios.get(`https://retoolapi.dev/1qOuQb/Doctorprofile?fname=${query}`)
            .then((res) => {
                    console.log(res.data)
                    setSearchResults(res.data);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
            });
    }, [query]);
    console.log(searchResults);

    return (
        <Container fluid className="mt-5 mb-5">
        <h1 className="text-center text-warning fw-bold mt-3 mb-5">Your Searched Doctor Details for {query}</h1>
        <Row>
            <Col md={3}>
                <Filter />
            </Col>
            <Col md={9}>
                    <Row className="row-cols-1 row-cols-md-3 g-4">
                        {searchResults.map((doctor) => (
                            <Col key={doctor.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{doctor.fname}</Card.Title>
                                        <Card.Text>Specialty: {doctor.specialization}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
            </Col>
        </Row>
    </Container>
    );
}

export default SearchResults;