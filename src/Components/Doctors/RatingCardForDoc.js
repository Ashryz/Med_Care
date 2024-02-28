import { FaStar } from "react-icons/fa";
import "./rating_card_for_doc.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import ReviewCard from "../review/Review";
function RatingCardForDoc({ revObj }) {
  const [click, setClick] = useState(false);
  return (
    <>
      <div className="rating__card" onClick={() => setClick(!click)}>
        <blockquote className="rating__card__quote">
          “{revObj.review}”
        </blockquote>
        <div className="rating__card__stars">
          {[...Array(revObj.rating)].map((_, index) => (
            <FaStar key={index} color="dodgerblue" className="m-1" size={20} />
          ))}
          {[...Array(5 - parseInt(revObj.rating))].map((_, index) => (
            <FaStar key={index} color="lightgray" className="m-1" size={20} />
          ))}
        </div>
        <p className="rating__card__date">{revObj.date}</p>
      </div>
      <Modal
        show={click}
        centered
        className="mymodal"
        style={{ border: "none" }}
        onHide={() => setClick(!click)}
        // onClick={() => setClick(!click)}
      >
        <Modal.Body
          className="mymodal"
          style={{ border: "none", backgroundColor: "transparent" }}
        >
          <ReviewCard revObj={revObj} />
        </Modal.Body>
      </Modal>
    </>
  );
}
export default RatingCardForDoc;
