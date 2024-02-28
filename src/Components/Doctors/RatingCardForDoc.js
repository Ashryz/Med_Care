import { FaStar } from "react-icons/fa";
import "./rating_card_for_doc.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditableReview from "../review/EditableReview";
import ReviewDel from "../review/ReviewDel";
import ReviewCard from "../review/Review";
import { FaEye } from "react-icons/fa";
function RatingCardForDoc({ revObj }) {
  const [action, setAction] = useState(false);

  return (
    <>
      <div className="rating__card">
        <div className="d-flex justify-content-between">
          <FaPen className="add" onClick={() => setAction("mod")} />
          <blockquote className="rating__card__quote">
            “{revObj.review}”
          </blockquote>
          <MdDelete className="delete" onClick={() => setAction("delete")} />
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
          className="rating__card__date text-muted mt-2"
          style={{ fontSize: "12px" }}
        >
          Last update: {revObj.date}
        </p>
        <FaEye className="add mt-2" onClick={() => setAction("view")} />
      </div>
      <Modal show={action === "mod"} onHide={() => setAction(false)} centered>
        <Modal.Body>
          <EditableReview revObj={revObj} onClose={() => setAction(false)} />
        </Modal.Body>
      </Modal>
      <Modal
        show={action === "delete"}
        onHide={() => setAction(false)}
        centered
      >
        <Modal.Body>
          <ReviewDel revObj={revObj} onClose={() => setAction(false)} />
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
