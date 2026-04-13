import React from "react";

const LoadingCard = () => {
  return (
    <div
      class="card loading-card"
      role="status"
      aria-live="polite"
      aria-label="Loading company"
    >
      <div class="card-right">
        <div class="spinner" aria-hidden="true"></div>
      </div>
    </div>
  );
};

export default LoadingCard;
