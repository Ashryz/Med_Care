import {  Container, Row, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardSmallDoc from '../CardDoctor/CardSmallDoc';
import { getDoctorsList } from '../../Store/Actions/Actions';

function ListDoctor() {
  const dispatch = useDispatch()
  const doctors = useSelector((state) => state.combineDoctors.doctors)

const [doctor,setDoctor]=useState([])
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);

useEffect(() => {
  dispatch(getDoctorsList())
},[])


// useEffect(()=>{

//   axios.get(`/doctors/doctors/`)
//   .then((res) => {
//     console.log(res.data)
//     setDoctor(res.data);
//     setTotalPages(Math.ceil(res.headers["x-total-count"] / 10));
//     console.log(res)
// })
//   .catch((err)=>console.log(err))

// },[currentPage])

console.log(doctors);
const handlePageChange = (page) => {
  setCurrentPage(page);
};
  return (
    <Container className="mt-5 mb-5">
    <Row >
    {doctors.map((doctor) => (
        <CardSmallDoc key={doctor.id} doc={doctor} />
    ))}
</Row>
<Pagination className="mt-3 justify-content-center">
    <Pagination.First onClick={() => handlePageChange(1)} />
    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
    {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
        >
            {index + 1}
        </Pagination.Item>
    ))}
    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
    <Pagination.Last onClick={() => handlePageChange(totalPages)} />
</Pagination>
</Container>
  )
  }
export default ListDoctor;
