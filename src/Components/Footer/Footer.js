import './Footer.css'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
function FooterComp() {
    return (
        <div className="container-fluid p-0">
            <footer className="w-100  main-bg-1 py-5 mt-5">
                <Container className='container d-flex justify-content-between'>
                    <div className="me-5 d-none d-lg-block">
                        <h1 className='fw-bold fs-2 text-white'><Link className='text-decoration-none text-white' to="/"><i className="bi bi-hospital"></i> MED-CARE </Link></h1>
                    </div>
                    <div>
                        <Link className="me-4 text-white fs-2"><i className="bi bi-facebook"></i></Link>
                        <Link className="me-4 text-white fs-2"><i className="bi bi-instagram"></i></Link>
                        <Link className="me-4 text-white fs-2"><i className="bi bi-twitter-x"></i></Link>
                        {/* <Link className="me-4 text-white fs-2"><i className="bi bi-github"></i></Link> */}
                    </div>
                </Container>
                <Container>
                    <hr className='text-white' />
                    <Row>
                        <Col>
                            <h2 className='text-white fs-3 fw-bold'>About Us</h2>
                            <ul className="list-unstyled fs-5">
                                {/* <li><Link className='text-white text-decoration-none' to={'Our'}>Our Team</Link></li> */}
                                <li><Link className='text-white text-decoration-none' to={'contact'}>Contact Us</Link></li>
                                <li><Link className='text-white text-decoration-none' to={'SignIn'}>Sign In</Link></li>
                            </ul>
                        </Col>
                        <Col>
                            <h2 className='text-white fs-3 fw-bold'>Need Help ? </h2>
                            <ul className="list-unstyled fs-5">
                                <li><Link className='text-white text-decoration-none' to={"Medical"}>Medical Library</Link></li>
                                <li><Link className='text-white text-decoration-none' to={'tems'}>Terms of Use</Link></li>
                                <li><Link className='text-white text-decoration-none'to={'pri'}>Privacy Policy</Link></li>
                            </ul>
                        </Col>
                        <Col>
                            <h2 className='text-white fs-3 fw-bold'>Contacts</h2>
                            <ul className="list-unstyled fs-5">
                                <li><p className='text-white text-decoration-none'></p></li>
                                <li><p className='text-white text-decoration-none'><i className="bi bi-house-fill"></i> Cairo, C 12311, EGYPT</p></li>
                                <li><p className='text-white text-decoration-none'><i className="bi bi-envelope-fill"></i> <a href="mailto:yabualam@gmail.com">customercare@medcare.com</a></p></li>
                                <li><p className='text-white text-decoration-none'><i className="bi bi-telephone-fill"></i> <a href="tel:+201099959294">+201099959294</a></p></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <hr className='text-white' />
                    <p className='text-white fs-6 text-center'>Copyright &#169; 2024, MedCare LTD - All Rights Reserved</p>
                </Container>
            </footer>
        </div>
    );
}

export default FooterComp;
