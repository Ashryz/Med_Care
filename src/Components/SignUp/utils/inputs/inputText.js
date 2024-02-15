import { Form } from 'react-bootstrap';

export const Input = ({ label, type, placeholder, value, onChange, isValid, message, name }) => {
    return (
        <Form.Group controlId={`formBasic${label}`} className='mb-2 text-start '>
            <Form.Label>{label}</Form.Label>
            <Form.Control name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} className='shadow'  />
            <div className='invalid-feedback'>{message}</div>

        </Form.Group>
    );
};