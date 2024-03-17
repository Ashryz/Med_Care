import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from './Sidebar';
import './style.css';
import { useState } from 'react';

function AddSchedule() {

    const [formData, setFormData] = useState({

        day: '',
        start_time: '',
        end_time: '',
        is_active: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    //     axios.post('your_backend_endpoint', formData) // Replace 'your_backend_endpoint' with your actual backend endpoint
    //         .then((response) => {
    //             console.log('Schedule created successfully');
    //             // Handle success, such as redirecting to another page
    //         })
    //         .catch((error) => {
    //             console.error('Error creating schedule:', error);
    //             // Handle error, such as displaying an error message
    //         });
    // };
    return (
        <>
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        <hr />
                        <div className="side col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9  mt-3">
                            <Form onSubmit={handleSubmit} className='w-75 rounded-4 shadow mx-auto'>
                                <div
                                    className="prim-pg text-center text-white p-1"
                                    style={{ borderRadius: "11px 11px 0px 0px" }}
                                >
                                    <span className="fw-light">App Schedule</span>
                                </div>
                                <div className='p-2 m-2'>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label> Day</Form.Label>
                                        <Form.Select name="day" value={formData.day} onChange={handleChange}>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                        </Form.Select>

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control type="time" name="start_time" value={formData.start_time} onChange={handleChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>End Time</Form.Label>
                                        <Form.Control type="time" name="end_time" value={formData.end_time} onChange={handleChange} />
                                    </Form.Group>

                                    <label>
                                        Active Now
                                        <input className='ms-2' type="checkbox" name="is_active" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
                                    </label>
                                   
                                    <div className='text-center mb-3'>
                                        <Button variant="primary" type="submit" className=''>
                                            Add
                                        </Button>
                                    </div>
                                </div>

                            </Form>


                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default AddSchedule;