import { Card } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import { axiosInstance } from "../../Network/axiosInstance";

const SchadulesCard = (props) => {
  const { schedule, schedules, setSchedules } = props;

  const handleDelete = () => {
    axiosInstance.delete(`/schedules/schedule/${schedule.id}/`)
      .then((response) => {
        console.log(response.data);
        // Filter out the deleted schedule from the local state
        const updatedSchedules = schedules.filter(item => item.id !== schedule.id);
        setSchedules(updatedSchedules);
      })
      .catch(error => {
        console.error('Error deleting schedule:', error);
      });
  };

  return (
    <>
      <Card className="rounded-3 shadow" style={{ backgroundColor: '#77ffe84b' }}>
        <Card.Body>
          <h5 className="card-title text-center fw-bold"><i className="bi bi-calendar me-2"></i>{schedule.day.charAt(0).toUpperCase() + schedule.day.slice(1)} </h5>
          <hr />
          <div className="px-2 ">
            <div className="d-flex mb-2">
              <span className="fs-5"><i className="bi bi-alarm"></i> Start Time :</span>
              <span className="ms-2 fs-5 text-muted">
                {schedule.start_time}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fs-5"><i className="bi bi-alarm-fill"></i> End Time :</span>
              <span className="ms-2 fs-5 text-muted">{schedule.end_time}</span>
            </div>
            {/* <div className="d-flex mb-2">
              <span className="fs-5"><i className="bi bi-check2-all"></i> Status :</span>
              <span className="ms-2 fs-5 text-muted">{schedule.is_active ? "Active" : "Inactive"}</span>
            </div> */}
          </div>
          <div className="mt-3">
            <div className="mx-3 d-flex justify-content-center align-items-center">
              <TrashFill className="trash fs-4" onClick={handleDelete} />
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default SchadulesCard;

