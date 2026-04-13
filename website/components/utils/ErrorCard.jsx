import React from "react";

const ErrorCard = () => {
  return (
    <div class="card error-card" role="alert" aria-live="assertive">
      <div class="error-emoji" aria-hidden="true">
        ⚠️
      </div>

      <div class="card-body">
        <h4 class="error-title">Something went wrong</h4>
        <p class="error-text">
          We couldn't load the company details. Please check your connection and
          try again.
        </p>

        <div class="error-actions">
          <button id="retryBtn" class="btn btn-primary">
            Retry
          </button>
          <button id="contactBtn" class="btn btn-ghost">
            Contact support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;
