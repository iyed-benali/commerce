import React from 'react';

const StarRatingg = ({ value }) => {
  const roundedValue = Math.round(value); // Round the value to the nearest integer

  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < roundedValue ? 'star filled' : 'star'}>★</span>
  ));

  return <div className="star-rating">{stars}</div>;
};

export default StarRatingg;
