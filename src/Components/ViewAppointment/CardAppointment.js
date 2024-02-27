import { Button } from "react-bootstrap";
import background from '../../img/bg_doctor.jpg'
import { useDispatch, useSelector, } from "react-redux";
import { addAppointmentSchadule, removeAppointmentSchadule } from "../../Store/Actions/Actions";



export const CardAppointment = (props) => {
    const { appointment } = props;
    
    const dispatch = useDispatch();
    const appointments = useSelector((state => state.combineSchadule.appointments))
    
    const isItemInSchadule = (item) => {
        return appointments.some((appointment) => appointment.id === item.id);

    }
    const handleToggleSchadule = (appointment)=>{
        isItemInSchadule(appointment)? dispatch(removeAppointmentSchadule(appointment)):
        dispatch(addAppointmentSchadule(appointment))
  

    }
    return (
        <div className="container  mb-3 p-0 text-start  rounded-4  shadow" style={{backgroundImage : `url(${background})`,backgroundSize:'cover'}}>
            <div className='prim-pg text-center text-white p-2 ' style={{ borderRadius: "11px 11px 0px 0px" }}><span className='fw-bold'>Appointment</span></div>
            <div className="row ms-3 my-3" >
                <div className="p-3 ">
                    <div className="d-flex" >
                        <span className="fs-4 fw-bold text-white">Number :</span>
                        <span className="ms-2 fs-4 text-muted"> {appointment.id}</span>
                    </div>
                    <div className="d-flex">
                        <span className="fs-4 fw-bold text-white">Patient Name :</span>
                        <span className="ms-2 fs-4 text-muted"> {appointment.name}</span>
                    </div>
                    <div className="d-flex">
                        <span className="fs-4 fw-bold text-white">Patient Email :</span>
                        <span className="ms-2 fs-4 text-muted"> {appointment.email}</span>
                    </div>
                    <div className="d-flex">
                        <span className="fs-4 fw-bold text-white">Date  :</span>
                        <span className="ms-2 fs-4 text-muted"> {appointment.date}</span>
                    </div>
                    <div className="my-3 py-2 d-flex justify-content-center">
                        <Button onClick={()=> handleToggleSchadule(appointment)} className="prim-pg border-0 me-2" value=''>{isItemInSchadule(appointment) ?  <span>Remove</span> : <span>Accept</span> } </Button>
                        <Button className="ms-2"> Reject</Button>
                    </div>
                </div>
            </div>

        </div>
    );


}