import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {  Button, Col, Row } from 'react-bootstrap';
import Booking from '../Boking/Booking';
import Filter from '../Filter/Filter';
import DoctorDetal from '../DoctorDetalis/DoctorDetal';
import AboutDoctor from '../AboutDoctor/AboutDoctor';
import PastionReview from '../PastionReview/PastionReview';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardDoctor  from '../CardDoctor/CardDoctor';
function ListDoctor() {

  const obj ={
    
    "id": 1,
    "age": "32",
    "area": "Giza",
    "fees": "600",
    "Image": "person.jpg",
    "email": "yusuf@gmail.com",
    "fname": "Yusuf",
    "lname": "Mohammad",
    "phone": "0102525600",
    "degree": "Consultant",
    "gender": "Male",
    "password": "Py12345",
    "specialization": "Cardiology and Thoracic Surgery (Heart & Chest)"
  
}
const [doctor,setdoctor]=useState([])
useEffect(()=>{

  axios.get("https://retoolapi.dev/46yPXc/doctors")
  .then((res)=>setdoctor(res.data))
  .catch((err)=>console.log(err))

},[])
console.log(doctor);
  return (
    <>
   {doctor.map((doc,index)=>{

return(
  <>
  
  
  <CardDoctor doc={doc}/>

  

  </>
  
)



   })}

<Pagination/>
{/* <Filter/> */}


 {/* <DoctorDetal/> */}
   </>
  )
}

export default ListDoctor;