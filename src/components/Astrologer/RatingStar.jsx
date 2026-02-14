import React from "react";
import ratingStar from "../../assets/fullstar.png";
import emptyStar from "../../assets/emptystar.png";

const Rating = ({ rating }) => {
  // Create an array of 5 items to represent 5 stars
  const stars = [...Array(5)].map((_, index) => {
    const isFilled = index < rating;
    const starSrc = isFilled ? ratingStar : emptyStar;
    return (
      <img
        key={index}
        src={starSrc}
        alt="star"
        className="w-2.5 h-2.5" // Adjust size of the star
      />
    );
  });

  return <div className="flex">{stars}</div>;
};

export default Rating;
