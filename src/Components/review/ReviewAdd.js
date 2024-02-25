import React, { useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { CiStar } from "react-icons/ci";

function ReviewAdd() {
    const [reviewText, setReviewText] = useState('');
    const [starRating, setStarRating] = useState(0);

    const handleReviewChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleStarClick = (rating) => {
        setStarRating(rating);
    };

    const handleAddReview = () => {
        console.log("New Review:", reviewText);
        console.log("Rating:", starRating);
        setReviewText('');
        setStarRating(0);
    };

    const handleCancel = () => {

        setReviewText('');
        setStarRating(0);
    };

    return (
        <div className="light-bg border rounded-3 " style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
            <Card.Body>
                <Row className='align-items-center justify-content-center mt-5 p-1'>
                    <div className='col-sm-6 text-center'>
                        <div className='rounded-5 shadow p-2 main-btn' >
                            <p className='mb-0'>
                                <span className='ms-2 fs-8 text-light'>Add Review</span>
                            </p>
                        </div>
                    </div>
                </Row>
                <Row className='justify-content-center align-items-center m-0 p-3'>
                    <div className='col-12 text-center'>
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <span key={index} onClick={() => handleStarClick(ratingValue)}>
                                    {ratingValue <= starRating ? (
                                        <FaStar color="dodgerblue" className='m-1' size={20} style={{ cursor: 'pointer' }} />
                                    ) : (
                                        <CiStar color="dodgerblue" className='m-1' size={20} style={{ cursor: 'pointer' }} />
                                    )}
                                </span>
                            );
                        })}
                    </div>
                </Row>
                <Row className='justify-content-center m-0 p-2'>
                    <div className='col-md-12'>
                        <form className=' p-3 rounded-5'>
                            <textarea className='form-control mb-2 shadow-lg' rows='5' value={reviewText} onChange={handleReviewChange} />
                            <Row className='align-items-center m-0 p-3 justify-content-center mt-2'>
                                <div className='col-sm-6 text-center'>
                                    <Button className='btn main-btn rounded-5 shadow-lg p-2' style={{ width: '80%', fontSize: '1rem' }} onClick={handleAddReview}>Submit</Button>
                                </div>
                                <div className='col-sm-6 text-center mt-2 mt-sm-0'>
                                    <Button className='btn sec-btn rounded-5 shadow-lg p-2' style={{ width: '80%', fontSize: '1rem' }} onClick={handleCancel}>Cancel</Button>
                                </div>
                            </Row>
                        </form>
                    </div>
                </Row>
            </Card.Body>
        </div>
    )
}

export default ReviewAdd;
