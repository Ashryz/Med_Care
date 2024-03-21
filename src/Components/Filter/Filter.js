import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenusMars, faCalendarWeek, faStethoscope, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import './filter.css'
function Filter() {
  return (
      <Card style={{ width: '20rem' }} className='ms-5'>
        <Card.Header className='text-center text-white fw-bold'style={{backgroundColor:'mediumseagreen'}}><h3 className='text-white'><i class="bi bi-funnel-fill"></i> Filter</h3></Card.Header>
        <Card.Body>
        <Accordion defaultActiveKey={['0']} alwaysOpen id='acc' style={{width:'17.5rem'}}>
      <Accordion.Item eventKey="0">
        <Accordion.Header style={{backgroundColor:'mediumseagreen'}}><h4><i className="bi bi-mortarboard-fill"></i>&nbsp;Title</h4></Accordion.Header>
        <Accordion.Body>
            <Form.Check
            type={'checkbox'}
            id={'check1'}
            label={'Professor'}
          />
            <Form.Check
            type={'checkbox'}
            id={'check2'}
            label={'Lecturer'}
          />
            <Form.Check
            type={'checkbox'}
            id={'check3'}
            label={'Consultant'}
          />
            <Form.Check
            type={'checkbox'}
            id={'check4'}
            label={'Specialist'}
          />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header><h4><FontAwesomeIcon icon={faVenusMars}/>&nbsp;Gender</h4></Accordion.Header>
        <Accordion.Body>
        <Form.Check
            type={'checkbox'}
            id={'check5'}
            label={'Male'}
          />
        <Form.Check
            type={'checkbox'}
            id={'check6'}
            label={'Female'}
          />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header><h4><FontAwesomeIcon icon={faCalendarWeek}/>&nbsp;Availabilty</h4></Accordion.Header>
        <Accordion.Body>
        <Form.Check
            type={'checkbox'}
            id={'check7'}
            label={'Any Day'}
          />
           <Form.Check
            type={'checkbox'}
            id={'check8'}
            label={'Today'}
          />
           <Form.Check
            type={'checkbox'}
            id={'check9'}
            label={'Tomorrow'}
          />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header><h4><FontAwesomeIcon icon={faStethoscope}/>&nbsp;Entity</h4></Accordion.Header>
        <Accordion.Body>
        <Form.Check
            type={'checkbox'}
            id={'check10'}
            label={'Hospital'}
          />
        <Form.Check
            type={'checkbox'}
            id={'check11'}
            label={'Clinic'}
          />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header><h4><FontAwesomeIcon icon={faMoneyBill1Wave}/>&nbsp;Examination Fee</h4></Accordion.Header>
        <Accordion.Body>
        <Form.Check
            type={'radio'}
            id={'radio1'}
            label={'Any'}
            name={'examinationPrice'}
          />
        <Form.Check
            type={'radio'}
            id={'radio2'}
            label={'Less than EGP 50'}
            name={'examinationPrice'}
          />
        <Form.Check
            type={'radio'}
            id={'radio3'}
            label={'From EGP 50 to 100'}
            name={'examinationPrice'}
          />
        <Form.Check
            type={'radio'}
            id={'radio4'}
            label={'From EGP 100 to 200'}
            name={'examinationPrice'}
          />
        <Form.Check
            type={'radio'}
            id={'radio5'}
            label={'From EGP 200 to 300'}
            name={'examinationPrice'}
          />
        <Form.Check
            type={'radio'}
            id={'radio6'}
            label={'Greater than EGP 300'}
            name={'examinationPrice'}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </Card.Body>
    </Card>
  );
}

export default Filter;
