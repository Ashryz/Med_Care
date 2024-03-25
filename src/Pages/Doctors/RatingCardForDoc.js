import { FaStar } from "react-icons/fa";
import "./rating_card_for_doc.css";
import { Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditableReview from "../../Components/review/EditableReview";
import ReviewDel from "../../Components/review/ReviewDel";
import ReviewCard from "../../Components/review/Review";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
function RatingCardForDoc({ revObj, refresh }) {
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser;
  const [action, setAction] = useState(false);

  return (
    <>
      <div className="rating__card" key={revObj.id}>
        {/* <div className="d-flex justify-content-center align-items-center"> */}
        <div
          className={`d-flex ${


            currentUser && currentUser.id === revObj.user.id
              ? "justify-content-between"
              : "justify-content-center"
          } align-items-center`}
        >
          {currentUser && currentUser.id === revObj.user.id && (
            <FaPen className="add" onClick={() => setAction("mod")} />
          )}
          <blockquote className="rating__card__quote text-center mb-0 w-100">
            <span style={{ wordWrap: "break-word" }} className="text-center">
              {revObj.comment}
            </span>
          </blockquote>
          {currentUser && currentUser.id === revObj.user.id && (
            <MdDelete className="delete" onClick={() => setAction("delete")} />
          )}
        </div>
        <div className="rating__card__stars">
          {[...Array(revObj.rating)].map((_, index) => (
            <FaStar key={index} color="dodgerblue" className="m-1" size={20} />
          ))}
          {[...Array(5 - parseInt(revObj.rating))].map((_, index) => (
            <FaStar key={index} color="lightgray" className="m-1" size={20} />
          ))}
        </div>
        <p
          className="rating__card__date text-muted mt-2 text-center"
          style={{ fontSize: "12px" }}
        >
          Last update: {/* show only the date and not the time */}
          {revObj.created_at.split("T")[0]}
        </p>
        <FaEye className="add mt-2" onClick={() => setAction("view")} />
      </div>
      <Modal
        show={action === "mod"}
        onHide={() => setAction(false)}
        centered
        className="p-0"
      >
        <Modal.Body
          style={{
            backgroundColor: "none",
            width: "100%",
            margin: "auto",
            padding: "0",
          }}
        >
          <EditableReview
            revObj={revObj}
            onClose={() => setAction(false)}
            refresh={refresh}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={action === "delete"}
        onHide={() => setAction(false)}
        centered
        className="trans-bg-custom"
      >
        <Modal.Body>
          <ReviewDel
            revObj={revObj}
            onClose={() => setAction(false)}
            refresh={refresh}
          />
        </Modal.Body>
      </Modal>

      <Modal show={action === "view"} onHide={() => setAction(false)} centered>
        <Modal.Body>
          <ReviewCard revObj={revObj} />
        </Modal.Body>
      </Modal>
    </>
  );
}
export default RatingCardForDoc;
