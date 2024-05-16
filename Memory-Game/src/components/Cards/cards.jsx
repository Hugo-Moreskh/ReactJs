// components/Card.js
import React from "react";
// import "./Card.css";

const Card = ({ id, img, isFlipped, onClick }) => {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={() => onClick(id)}
    >
      <img src={isFlipped ? img : "/fond carte.jpg"} alt="card" />
    </div>
  );
};

export default Card;
