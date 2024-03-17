import { useDispatch, useSelector } from "react-redux"
import background from '../../img/bg_doctor.jpg'
import { removeAppointmentSchadule } from "../../Store/Actions/Actions"
import Sidebar from "../Dashboard/Sidebar"


export const Schadule = () => {
    const appointments = useSelector((state => state.combineSchadule.appointments))
    const dispatch = useDispatch()

    const handleClose = (item) => {
        dispatch(removeAppointmentSchadule(item))
    }
    const SchaduleItem = (appointment) => {

        return (

            <div className="container mx-auto w-75 my-3 p-0 text-start  rounded-4  shadow col-md-9" key={appointment.id}  style={{backgroundImage : 'linear-gradient(to top,MediumSeaGreen , dodgerBlue)'}}>

                <div className='prim-pg text-center text-white p-2 ' style={{ borderRadius: "11px 11px 0px 0px" }}><span className='fw-bold'>Appointment</span></div>
                <button onClick={() => handleClose(appointment)} className="btn-close float-end" aria-label="Close"></button>
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
                    </div>
                </div>
            </div>


        );
    }
    const emptySchadule = () => {
        return (
            <div className="px-4 my-4 mx-auto shadow w-75 rounded-4 py-3">
                <div className="container py-4">
                    <div className="row">
                        <h3>Your Schadule is Empty</h3>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <hr />
                    <div className="side col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 mt-3">
                        <h2 className="text-muted text-center">Your Schedule Appointments</h2>
                        {appointments.length === 0 && emptySchadule()}
                        {appointments.length !== 0 && appointments.map(SchaduleItem)}
                    </div>
                </div>
            </div>
        </div>
    );
}