import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './ListDoctor.css'
import {  Col, Row } from 'react-bootstrap';
import Booking from '../Boking/Booking';
import Filter from '../Filter/Filter';
function ListDoctor() {
  return (
   <div className='Min p-4'>
<Row>
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
<div className='col '>
<Booking/>
</div>
</Row>

<Filter/>
   </div>
   
  )
}

export default ListDoctor;