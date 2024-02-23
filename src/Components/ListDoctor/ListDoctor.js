import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './ListDoctor.css'
import {  Button, Col, Row } from 'react-bootstrap';
import Booking from '../Boking/Booking';
import Filter from '../Filter/Filter';
import DoctorDetal from '../DoctorDetalis/DoctorDetal';
import AboutDoctor from '../AboutDoctor/AboutDoctor';
import PastionReview from '../PastionReview/PastionReview';
function ListDoctor() {
  return (
    <>
    
<div className='container p-0 w-70'>

<Row className='ser-card sm=8 border p-3 rounded-3 shadow me-3 mb-2'>
   <div className='col col-2'>
   <img id='img' src='person.jpg'></img>

   </div>
   <div className='col'>
 <h5>Doctor Ghazy Abdelmaneem</h5>
<p>Consultant of diabetes and internal medicine</p> 
<p>Endocrinologist Specialized in Adult Diabetes and Endocrinology</p>
<div>
<img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
</div>
<p>El-Dokki:El Tahrir</p>
<p>Fees:300EGP</p>
<p>16676-cost-of-regular-call </p>

   </div>
   <div className='col'>
   <Button className='btn w-25 m-2 mt-5 sm-3' variant="danger">Boking</Button>{' '}
      <Button className='btn w-25 m-2 mt-5 sm-4' variant="info">Details</Button>{' '}
   </div>
</Row>
</div>

<div className='container p-0 w-70'>

<Row className='ser-card sm=8 border p-3 rounded-3 shadow me-3 mb-2'>
   <div className='col col-2'>
   <img id='img' src='person.jpg'></img>

   </div>
   <div className='col'>
 <h5>Doctor Ghazy Abdelmaneem</h5>
<p>Consultant of diabetes and internal medicine</p> 
<p>Endocrinologist Specialized in Adult Diabetes and Endocrinology</p>

<p>El-Dokki:El Tahrir</p>
<p>Fees:300EGP</p>
<p>16676-cost-of-regular-call </p>

   </div>
   <div className='col'>
   <Button className='btn w-25 m-2 mt-5 sm-3' variant="danger">Boking</Button>{' '}
      <Button className='btn w-25 m-2 mt-5 sm-4' variant="info">Details</Button>{' '}
   </div>
</Row>
</div>
<div className='container p-0 w-70'>

<Row className=' sm=8 border p-3 rounded-3 shadow me-3 mb-2'>
   <div className='col col-2'>
   <img id='img' src='person.jpg'></img>

   </div>
   <div className='col'>
 <h5>Doctor Ghazy Abdelmaneem</h5>
<p>Consultant of diabetes and internal medicine</p> 
<p>Endocrinologist Specialized in Adult Diabetes and Endocrinology</p>

<p>El-Dokki:El Tahrir</p>
<p>Fees:300EGP</p>
<p>16676-cost-of-regular-call </p>

   </div>
   <div className='col'>
   <Button className='btn w-25 m-2 mt-5 sm-3 main-btn' >Boking</Button>{' '}
      <Button className='btn w-25 m-2 mt-5 sm-4 sec-btn'>Details</Button>{' '}
   </div>
</Row>
</div>

<Filter/>


 <DoctorDetal/>
<AboutDoctor/>
<PastionReview/>
   </>
  )
}

export default ListDoctor;