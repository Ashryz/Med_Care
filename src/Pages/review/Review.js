import React from 'react'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReviewCard from '../../Components/review/Review';
import EditableReview from '../../Components/review/EditableReview';
import ReviewDel from '../../Components/review/ReviewDel';
import ReviewAdd from '../../Components/review/ReviewAdd';
function Review() {
    const [showModal, setShowModal] = useState(false);
    const [revType, setRevType] = useState('');
    const revObj = {
        patint: 'Mohamed',
        rating: 3,
        date: '12-12-2020',
        review: "Dr. Ahmed is a very professional doctor. He is very kind and helpful. I highly recommend him.",
        patiant_id: 1,
        doctor_id: 1,
        patiant_img: 'person.jpg',
    };


    const handleReview = (type) => {
        setShowModal(true);
        setRevType(type);
    }

    const handleCloseReview = () => {
        setShowModal(false);
    }

    return (
        <div className='container-fluid' style={{ height: '53.9vh' }}>
            <h1>review Components</h1>
            <div className='row p-3'>
                <button className='col btn btn-success m-2' onClick={() => handleReview('add')}>Add review</button>
                <button className='col btn btn-primary m-2' onClick={() => handleReview('view')}>View review</button>
                <button className='col btn btn-warning m-2' onClick={() => handleReview('update')}>Update review</button>
                <button className='col btn btn-danger m-2' onClick={() => handleReview('delete')}>Delete review</button>

            </div>

            <div className='row p-3 justify-content-center mt-3 bg-light border w-75' >
                <div className=''>
                <ReviewCard revObj={revObj} />
                </div>
            </div>
            <div className='row p-3 justify-content-center mt-3 bg-light border w-75' >
                <div className=''>
                <EditableReview revObj={revObj} />
                </div>
            </div>
            <div className='row p-3 justify-content-center mt-3 bg-light border w-75' >
                <div className=''>
                <ReviewDel revObj={revObj} />
                </div>
            </div>
            <div className='row p-3 justify-content-center mt-3 bg-light border w-75' >
                <div className=''>
                <ReviewAdd revObj={revObj} />
                </div>
            </div>

            
            <Modal show={showModal} onHide={handleCloseReview} size='md'  >
                <Modal.Header className='prim-pg' closeButton>
                </Modal.Header>
                <Modal.Body className="rounded-5">
                    <ReviewCard revObj={revObj} onClose={handleCloseReview} />
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default Review