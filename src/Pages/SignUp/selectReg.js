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
        <div className='container' style={{ height: '53.9vh' }}>
            <div className='container m-auto mt-3 w-50 p-3 border shadow rounded-4 d-flex justify-content-center align-items-center h-50'>
                <div className='row'>
                    <div className='col-12'>
                        <h1 className='text-center sec-color'>Regis<span className='prim-color'>tration</span></h1>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                            <button className='col fw-bold btn  m-2 py-3 shadow main-btn' onClick={() => handleSignUp('Patient')}>Patient</button>
                            <button className='col btn fw-bold  m-2 py-3 shadow sec-btn' onClick={() => handleSignUp('Doctor')}>Doctor</button>
                        </div>

                        {showSignUp && (
                            <Modal show={showSignUp} onHide={handleCloseSignUp} size='md' centered  >
                                <Modal.Header className='prim-pg' closeButton>
                                </Modal.Header>
                                <Modal.Body className='bg-light '>
                                    <SignUpDoc userType={userType} onClose={handleCloseSignUp} />
                                </Modal.Body>
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default YourComponent;
