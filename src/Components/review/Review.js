import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';

import { FaStar } from 'react-icons/fa';

import { CiStar } from "react-icons/ci";

import EditableReview from './EditableReview';

const ReviewCard = ({ revObj }) => {

    


    const handelUpdate = () => {
        
        return <EditableReview revObj={revObj} />
    }

    return (
        <div className="light-bg border rounded-3 " style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
            <img src={revObj.patiant_img} className='rounded-circle shadow' style={{ width: '100px', height: '100px', position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)' }} alt='patient' />
            <Card.Body>
                <Row className='align-items-center m-0 p-3 justify-content-center mt-5'>
                    <div className='col-sm-6 text-center'>
                        <Button className='btn main-btn rounded-5 shadow-lg p-2' style={{ width: '80%', fontSize: '1rem' }}>Update</Button>
                    </div>
                    <div className='col-sm-6 text-center mt-2 mt-sm-0'>
                        <Button className='btn sec-btn rounded-5 shadow-lg p-2' style={{ width: '80%', fontSize: '1rem' }} onClick={handelUpdate}>Delete</Button>
                    </div>
                </Row>
                <Row className='justify-content-center align-items-center m-0 p-3'>
                    <div className='col-12 text-center'>
                        <FaStar color="dodgerblue" className='m-1 ' size={20} />
                        <FaStar color="dodgerblue" className='m-1' size={20} />
                        <FaStar color="dodgerblue" className='m-1 ' size={20} />
                        <CiStar color="dodgerblue" className='m-1 ' size={20} />
                        <CiStar color="dodgerblue" className='m-1 ' size={20} />
                    </div>
                </Row>
                <Row className='justify-content-center m-0 p-3 h-50'>
                    <div className='col-12 text-center bg-light p-3 rounded-5 shadow-lg'>
                        <h6>{revObj.review}</h6>
                    </div>
                </Row>
                <Row className='justify-content-center m-0 p-3'>
                    <div className='col-12 text-center'>
                        <p className='text-muted small fs-8 text-center'>
                            Last update: {revObj.date}
                        </p>
                    </div>
                </Row>
            </Card.Body>
        </div>

    );
};

export default ReviewCard;