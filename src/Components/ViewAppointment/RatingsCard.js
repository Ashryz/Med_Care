// src/components/RatingsCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const RatingsCard = ({ averageRating }) => {
  return (
    <Card>
      <Card.Body>
        <FaStar size={50} color="#28a745" />
        <Card.Text>Average Rating</Card.Text>
        <Card.Title>{averageRating.toFixed(1)}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default RatingsCard;
