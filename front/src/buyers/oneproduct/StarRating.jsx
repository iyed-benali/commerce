import React from 'react';

const StarRating = ({ value, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map((starValue) => (
        <span
          key={starValue}
          className={starValue <= value ? 'star filled' : 'star'}
          onClick={() => onRatingChange(starValue)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
