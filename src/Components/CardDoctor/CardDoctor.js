import { Button, Row } from 'react-bootstrap';
import './ListDoctor.css'
import { Link } from 'react-router-dom';
import Booking from '../Boking/Booking';
function CardDoctor({doc}){
    return(
        <div className='container p-0 w-70'>
<Row className='doc_card border p-3 rounded-3 shadow me-3 mb-2'>
   <div className='col col-sm-3 p-0'>
   <img id='img' src={doc.Image}></img><br></br>
   <Link to='/DoctorDetl'><Button className='btn w-25 m-2 mt-5 sm-4 sec-btn'>Details</Button></Link> 

   </div>
   <div className='col p-0'>
 <h5>{doc.fname+" "+doc.lname}</h5>
<p>{doc.specialization}</p> 
<p>Endocrinologist Specialized in Adult Diabetes and Endocrinology</p>
<img  src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
<p>{doc.area}</p>
<p>Fees:{doc.fees}</p>
<p>{doc.phone}-cost-of-regular-call </p>

   </div>
   <div className='col p-0 col-4'>
    {/* <Booking/>  */}
   {/* <Button className='btn w-25 m-2 mt-5 sm-3 main-btn' >Boking</Button>{' '} */}
   </div>
</Row>
</div>
    )
}export default  CardDoctor;