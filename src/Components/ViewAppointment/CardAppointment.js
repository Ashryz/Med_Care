import { Button } from "react-bootstrap";
import background from "../../img/bg_doctor.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addAppointmentSchadule,
  removeAppointmentSchadule,
} from "../../Store/Actions/Actions";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { axiosInstance } from "../../Network/axiosInstance";

export const CardAppointment = (props) => {
  const { appointment } = props;

    // const dispatch = useDispatch();
    // const appointments = useSelector((state => state.combineSchadule.appointments))

    // const isItemInSchadule = (item) => {
    //     return appointments.some((appointment) => appointment.id === item.id);

    // }
    // const handleToggleSchadule = (appointment) => {
    //     isItemInSchadule(appointment) ? dispatch(removeAppointmentSchadule(appointment)) :
    //         dispatch(addAppointmentSchadule(appointment))
       
        

    // }
    const handleAccept =()=>{
        console.log(appointment);
        axiosInstance.put(`/appointments/appointment/${appointment.id}/`,{
            "doctor":appointment.doctor,
            "schedule":appointment.schedule,
            "user":appointment.user.id,
            "is_accepted":true
        } )
    }
    const handleReject = ()=>{
        axiosInstance.put(`/appointments/appointment/${appointment.id}/`,{
            "doctor":appointment.doctor,
            "schedule":appointment.schedule,
            "user":appointment.user.id,
            "is_accepted":false
        } )

    }
    const authContext = useContext(AuthContext);
    const currentUser = authContext.currentUser;
    if (currentUser.is_doctor) {
        return (
            <div className="container  mb-3 p-0 text-start  rounded-4  shadow" style={{ backgroundImage: 'linear-gradient(to top,MediumSeaGreen , dodgerBlue)' }}>
                <div className='prim-pg text-center text-white p-2 ' style={{ borderRadius: "11px 11px 0px 0px" }}><span className='fw-bold'>Appointment</span></div>
                <div className="row ms-3 my-3" >
                    <div className="p-3 ">
                        <div className="d-flex" >
                            <span className="fs-5 fw-bold text-white">Number :</span>
                            <span className="ms-2 fs-5 text-muted"> {appointment.id}</span>
                        </div>
                        <div className="d-flex">
                            <span className="fs-5 fw-bold text-white">Patient Name :</span>
                            <span className="ms-2 fs-5 text-muted"> {appointment.user.first_name}</span>
                            <span className="ms-2 fs-5 text-muted"> {appointment.user.last_name}</span>
                        </div>
                        <div className="d-flex">
                            <span className="fs-5 fw-bold text-white">Patient Email :</span>
                            <span className="ms-2 fs-5 text-muted"> {appointment.user.email}</span>
                        </div>
                        <div className="d-flex">
                            <span className="fs-5 fw-bold text-white">Date  :</span>
                            <span className="ms-2 fs-5 text-muted"> {appointment.create_at}</span>
                        </div>
                        <div className="d-flex">
                            <span className="fs-5 fw-bold text-white">schedule  :</span>
                            <span className="ms-2 fs-5 text-muted"> {appointment.schedule}</span>
                        </div>
                        <div className="d-flex">
                            <span className="fs-5 fw-bold text-white">Payment :</span>
                            <span className="ms-2 fs-5 text-muted"> Paid</span>
                        </div>
                        <div className="my-3 py-2 d-flex justify-content-center">
                          
                            <Button onClick={handleAccept} >Accept</Button>
                            <Button className="ms-2" onClick={handleReject} > Reject</Button>
                        </div>
                    </div>
                </div>

            </div>
        );

    }
    else 
    {
        return (
            <div className="container  mb-3 p-0 text-start  rounded-4  shadow" style={{ backgroundImage: 'linear-gradient(to top,MediumSeaGreen , dodgerBlue)' }}>
                <div className='prim-pg text-center text-white p-2 ' style={{ borderRadius: "11px 11px 0px 0px" }}><span className='fw-bold'>Appointment</span></div>
                <div className="row ms-3 my-3" >
                    <div className="p-3 ">
                        <div className="d-flex" >
                            <span className="fs-5 fw-bold text-white">Number :</span>
                            <span className="ms-2 fs-5 text-muted"> {appointment.id}</span>
                        </div>
                        <div className="d-flex">
                            <span className="fs-5 fw-bold text-white">Doctor Name :</span>
                            <span className="ms-2 fs-5 text-muted"> {appointment.doctor.user.first_name}</span>
                            <span className="ms-2 fs-5 text-muted"> {appointment.doctor.user.last_name}</span>
                        </div>
                        <div className="d-flex">
                            <span className="fs-5 fw-bold text-white">Doctor Email :</span>
                            <span className="ms-2 fs-5 text-muted"> {appointment.doctor.user.email}</span>
                        </div>
                        <div className="d-flex">
                            <span className="fs-5 fw-bold text-white">Date  :</span>
                            <span className="ms-2 fs-5 text-muted"> {appointment.create_at}</span>
                        </div>
                        <div className="d-flex">
                            <span className="fs-5 fw-bold text-white">Payment :</span>
                            <span className="ms-2 fs-5 text-muted"> Paid</span>
                        </div>
                        <div className="my-3 py-2 d-flex justify-content-center">
                            <Button className="prim-pg border-0 me-2" value=''>{appointment.is_accepted? <span>Accepted</span> : <span>Pending</span>} </Button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}