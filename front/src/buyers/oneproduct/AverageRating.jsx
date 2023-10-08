import React from 'react';

const AverageRating = ({ averageRating }) => {
  const stars = [1, 2, 3, 4, 5];

  const filledStars = Math.round(averageRating);

  return (
    <div className="average-rating">
      <p>Average Rating:</p>
      {stars.map((starValue) => (
        <span
          key={starValue}
          className={starValue <= filledStars ? 'star filled' : 'star'}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default AverageRating;
