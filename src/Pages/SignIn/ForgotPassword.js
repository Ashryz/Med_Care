import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [data, setData] = useState({
        email: '',

    })
    const [errors, setErrors] = useState({
        emailErrors: '',


    })
    const inputChange = (e) => {
        if (e.target.name === 'email') {
            console.log(e.target.value);
            setData({
                ...data,
                email: e.target.value
            })
        }
    }
    const navigate = useNavigate();
    const handleResetPassword = (e) => {
        e.preventDefault();
        if (!data.email.trim()) {
            setErrors({
                ...errors,
                emailErrors: "This Field is Required",

            });
        }

        const storedUsers = JSON.parse(localStorage.getItem('patients')) || [];
        const userFound = storedUsers.find(user => user.email === data.email);
        if (userFound){
            navigate("/changepassword")
        }
        else {
            setErrors({
                ...errors,
                emailErrors: "Email is not correct or not found"
            });
        }

    }
    return (

        <div className="bg-light" style={{ height: "100vh" }}>
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-md-8 " >
                        <ListGroup className="cardhead listStyle m-3 bg-primary" as="ul">
                            <ListGroup.Item
                                className="cardhead prim-pg listgroupItem"
                                as="li"
                            >
                                <p className="text-center   text-light cardhead">
                                    {" "}
                                    Forgot Password
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Form onSubmit={handleResetPassword}>
                                    <div className="p-3  text-start">
                                        <label htmlFor="password" className="form-label fw-bold text-muted">
                                            Enter your E-mail to reset Password
                                        </label>
                                       
                                        <Form.Control name="email" type="email" value={data.email} placeholder="email@example.com" onChange={(e) => inputChange(e)} isInvalid={!!errors.emailErrors} isValid={!errors.emailErrors && data.email} />
                                        <Form.Control.Feedback type="invalid">{errors.emailErrors}</Form.Control.Feedback>
                                    </div>
                                    <div className="text-center">
                                        <Button type="submit" className="btn main-btn my-3 rounded-2 fw-bold ">
                                            Reset
                                        </Button>

                                    </div>
                                </Form>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForgotPassword;


