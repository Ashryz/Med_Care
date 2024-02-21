import React from 'react'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReviewComponent from '../../Components/review/ReviewComponent';
function Review() {
    const [showModal, setShowModal] = useState(false);
    const [revType, setRevType] = useState('');

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
            <Modal show={showModal} onHide={handleCloseReview} size='md'  >
                <Modal.Header className='prim-pg' closeButton>
                </Modal.Header>
                <Modal.Body className="rounded-5">
                        <ReviewComponent action={revType} onClose={handleCloseReview} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Review