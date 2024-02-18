import React, { useEffect } from 'react'
import '../css/signup.css'
import { useState, } from 'react'
import { Input } from '../inputs/inputText.js'
import { Button, Form, } from 'react-bootstrap'
import { Validations } from '../validations/validation.js'
import AlertNew from '../alert/alertNew.js'
import { useNavigate } from 'react-router-dom'

class Person {
    constructor(fname, lname, email, password, age, gender, phone, imgleink) {
        this.fname = fname;
        this.lname = lname;
        this.name = fname + " " + lname;
        this.email = email;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.phone = phone;
        this.imgleink = imgleink || '';
    }
}

class DocObj extends Person {
    constructor(fname, lname, email, password, age, gender, phone, imgleink, area, specialization, clinics, degree, fees) {
        super(fname, lname, email, password, age, gender, phone, imgleink);
        this.area = area || '';
        this.specialization = specialization || [];
        this.clinics = clinics || [];
        this.degree = degree || [];
        this.fees = fees || [];
        this.type = 'doctor';
    }
}

class PatientObj extends Person {
    constructor(fname, lname, email, password, age, gender, phone, imgleink, area, doctors, diseases, medicines, reports) {
        super(fname, lname, email, password, age, gender, phone, imgleink);
        this.area = area || '';
        this.appointments = [];
        this.doctors = doctors || [];
        this.diseases = diseases || [];
        this.medicines = medicines || [];
        this.reports = reports || [];
        this.type = 'patient';
    }
}


export function SignUpDoc({ userType, onClose }) {

    //initializing the local storage
    if (!localStorage.getItem('docs')) {
        localStorage.setItem('docs', JSON.stringify([]))
    }
    if (!localStorage.getItem('patients')) {
        localStorage.setItem('patients', JSON.stringify([]))
    }
    // eslint-disable-next-line
    const [localDocs, setLocalDocs] = useState(JSON.parse(localStorage.getItem('docs')) || [])
    // eslint-disable-next-line
    const [localPatients, setLocalPatients] = useState(JSON.parse(localStorage.getItem('patients')) || [])
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const handleCloseAlert = () => setShowAlert(false);

    const [fname, setFname] = useState({ value: '', isValid: false, message: '' });
    const [lname, setLname] = useState({ value: '', isValid: false, message: '' });
    const [email, setEmail] = useState({ value: '', isValid: false, message: '' });
    const [phone, setPhone] = useState({ value: '', isValid: false, message: '' });
    const [password, setPassword] = useState({ value: '', isValid: false, message: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', isValid: false, message: '' });
    const [age, setAge] = useState({ value: '', isValid: false, message: '' });
    const [gender, setGender] = useState('male')

    const handelChange = function (e) {
        let result = { isValid: false, message: '' }

        switch (e.target.name) {
            case 'fname':
                result = Validations.nameValid(e.target.value)
                setFname({ value: e.target.value, isValid: result.isValid, message: result.message })
                e.target.className = result.isValid ? 'form-control is-valid' : 'form-control is-invalid'
                break;
            case 'lname':
                result = Validations.nameValid(e.target.value)
                setLname({ value: e.target.value, isValid: result.isValid, message: result.message })
                e.target.className = result.isValid ? 'form-control is-valid' : 'form-control is-invalid'
                break;
            case 'email':
                result = Validations.emailValid(e.target.value)
                setEmail({ value: e.target.value, isValid: result.isValid, message: result.message })
                e.target.className = result.isValid ? 'form-control is-valid' : 'form-control is-invalid'
                break;
            case 'phone':
                result = Validations.phoneValid(e.target.value)
                setPhone({ value: e.target.value, isValid: result.isValid, message: result.message })
                e.target.className = result.isValid ? 'form-control is-valid' : 'form-control is-invalid'
                break;
            case 'password':
                result = Validations.passwordValid(e.target.value)
                setPassword({ value: e.target.value, isValid: result.isValid, message: result.message })
                e.target.className = result.isValid ? 'form-control is-valid' : 'form-control is-invalid'
                break;
            case 'confirmPassword':
                result = Validations.confirmPasswordValid(password.value, e.target.value)
                setConfirmPassword({ value: e.target.value, isValid: result.isValid, message: result.message })
                e.target.className = result.isValid ? 'form-control is-valid' : 'form-control is-invalid'
                break;
            case 'age':
                result = Validations.ageValid(parseInt(e.target.value))
                setAge({ value: e.target.value, isValid: result.isValid, message: result.message })
                e.target.className = result.isValid ? 'form-control is-valid' : 'form-control is-invalid'
                break;
            case 'gender':
                setGender(e.target.value)
                break;
            default:
                break;
        }
    }
    const navigte = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            fname.isValid === true
            && lname.isValid === true
            && email.isValid === true
            && phone.isValid === true
            && password.isValid === true
            && confirmPassword.isValid === true
            && age.isValid === true
        ) {
            if (
                localDocs.find(doc => doc.email === email.value) ||
                localDocs.find(doc => doc.phone === phone.value) ||
                localPatients.find(pat => pat.email === email.value) ||
                localPatients.find(pat => pat.phone === phone.value)
            ) {

                setAlertTitle('Error');
                setAlertMessage('Doctor already exists');
                setShowAlert(true);
                setEmail({ value: email.value, isValid: false, message: `${userType} Already exists` });
                setPhone({ value: phone.value, isValid: false, message: `${userType} Already exists` });
            }
            else {


                if (userType === 'Doctor') {
                    const newdoc = new DocObj(
                        fname.value,
                        lname.value,
                        email.value,
                        password.value,
                        age.value,
                        gender,
                        phone.value
                    );
                    localDocs.push(newdoc);
                    localStorage.setItem('docs', JSON.stringify(localDocs));

                    setAlertTitle('Success');
                    setAlertMessage('Doctor has been added successfully');
                    setShowAlert(true);
                    navigte("/SignIn")
                } else {
                    const newpat = new PatientObj(
                        fname.value,
                        lname.value,
                        email.value,
                        password.value,
                        age.value,

                    );
                    localPatients.push(newpat);
                    localStorage.setItem('patients', JSON.stringify(localPatients));
                    setAlertTitle('Success');
                    setAlertMessage('Patient has been added successfully');
                    setShowAlert(true);
                    

                    navigte("/SignIn")

                }
                onClose();
            }
        } else {

            setAlertTitle('Error');
            setAlertMessage('Please fill all the fields correctly');
            setShowAlert(true);
        }
    };



    useEffect(() => {

    }, [localDocs, localPatients])


    return (
        <div className='container  mt-2 text-center  p-2  '>
            <div className='text-center '>
                {showAlert && <AlertNew title={alertTitle} message={alertMessage} onClose={handleCloseAlert} />}
            </div>
            <Form className='container text-start p-4 border rounded-4' onSubmit={handleSubmit}>
                <div className='d-flex justify-content-center'>
                    <h2 className='prim-color text-capitalize'>{userType} <span className='sec-color'>Sign Up</span></h2>
                </div>
                <Input name="fname" label='First Name' type='text' placeholder='Enter First Name' onChange={(e) => handelChange(e)} value={fname.value} message={fname.message} />
                <Input name="lname" label='Last Name' type='text' placeholder='Enter Last Name' onChange={(e) => handelChange(e)} value={lname.value} message={lname.message} />
                <Input name="email" label='Email' type='email' placeholder='Enter Email' onChange={(e) => handelChange(e)} value={email.value} message={email.message} />
                <Input name="phone" label='Phone' type='text' placeholder='Enter Phone' onChange={(e) => handelChange(e)} value={phone.value} message={phone.message} />
                <Input name="password" label='Password' type='password' placeholder='Enter Password' onChange={(e) => handelChange(e)} value={password.value} isValid={password.isValid} message={password.message} />
                <Input name="confirmPassword" label='Confirm Password' type='password' placeholder='Enter Confirm Password' onChange={(e) => handelChange(e)} value={confirmPassword.value} isValid={confirmPassword.isValid} message={confirmPassword.message} />
                <Input name="age" label='Age' type='text' placeholder='Enter Age' onChange={(e) => handelChange(e)} value={age.value} isValid={age.isValid} message={age.message} />
                <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" className="form-user-select-sm shadow" onChange={(e) => setGender(e.target.value)} value={gender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Form.Control>
                </Form.Group>
                <div className='d-flex justify-content-center mt-3'>
                    <Button variant="" type="submit" className='shadow w-75 main-btn'>
                        Sign Up
                    </Button>
                </div>
            </Form>
        </div >
    )
}
