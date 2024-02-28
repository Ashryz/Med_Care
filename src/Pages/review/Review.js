import React, { useEffect } from "react";
import { useState } from "react";
// import { Modal } from 'react-bootstrap';
import ReviewCard from "../../Components/review/Review";
import ReviewAdd from "../../Components/review/ReviewAdd";
// import EditableReview from '../../Components/review/EditableReview';
// import ReviewDel from '../../Components/review/ReviewDel';
// import ReviewAdd from '../../Components/review/ReviewAdd';
import axios from "axios";
import { Button } from "react-bootstrap";
function Review() {
  //const [showModal, setShowModal] = useState(false);
  // const revObj = {
  //     patint: 'Mohamed',
  //     rating: 3,
  //     date: '12-12-2020',
  //     review: "Dr. Ahmed is a very professional doctor. He is very kind and helpful. I highly recommend him.",
  //     patiant_id: 1,
  //     doctor_id: 1,
  //     patiant_img: 'person.jpg',
  // };

  const [add, setAdd] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://retoolapi.dev/bGDaxE/feedback")
      .then((response) => {
        const filteredData = response.data.filter((row) => row.doc_id !== null);
        setData(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mb-5">Review Components Tests</h1>
      <div className="row justify-content-center">
        <Button onClick={() => setAdd(!add)} className="text-center mb-2">
          Add
        </Button>
        <hr />
      </div>

      {add && <ReviewAdd />}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center mt-5 row-gap-5">
        {data.map((revObj) => {
          return (
            <div className="col" key={revObj.id}>
              <ReviewCard revObj={revObj} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Review;
