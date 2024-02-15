import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { SignUpDoc } from './signUpDoc.js';

function YourComponent() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [userType, setUserType] = useState('');

    const handleSignUp = (type) => {
        setShowSignUp(true);
        setUserType(type);
    };

    const handleCloseSignUp = () => {
        setShowSignUp(false);
    };

    return (
        <div className='container m-auto mt-5 w-100 p-0 m-0' style={{ height: '50vh' }}>
            <div className='row '>
                <div className='col text-center'>
                    <h1>Select <span className='text-primary'>Registration</span> Type</h1>
                    <div className='row text-center  w-100 h-100'>
                        <button className='btn btn-primary col-6  ' onClick={() => handleSignUp('Doctor')}>
                            Doctor
                        </button>
                        <button className='btn btn-danger col' onClick={() => handleSignUp('Patient')}>
                            Patient
                        </button>
                    </div>
                    {showSignUp && (
                        <Modal show={showSignUp} onHide={handleCloseSignUp} size='md' centered>
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                <SignUpDoc userType={userType} onClose={handleCloseSignUp} />
                            </Modal.Body>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
}

export default YourComponent;
