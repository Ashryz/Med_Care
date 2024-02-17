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
        <div className='container m-auto mt-5 w-50 p-3 border shadow' style={{ height: '25vh' }}>
            <div className='row'>
                <div className='col-12'>
                    <h1 className='text-center text-primary'>Regis<span className='text-danger'>tration</span></h1>
                </div>
                <div className='col-12'>
                    <div className='row'>
                        <button className='col btn btn-danger w-75 m-2 py-3 shadow' onClick={() => handleSignUp('patient')}>Patient</button>
                        <button className='col btn btn-primary w-75 m-2 py-3 shadow' onClick={() => handleSignUp('Doctor')}>Doctor</button>
                    </div>

                    {showSignUp && (
                        <Modal show={showSignUp} onHide={handleCloseSignUp} size='md' centered>
                            <Modal.Header closeButton className='bg-primary'>
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
