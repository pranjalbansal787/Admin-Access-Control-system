import React from 'react';
import './CardDisplayContainer.css';

const CardDisplay = ({ access }) => {
  return (
    // Container for displaying the cards
    <div className="card-display-container">
      {/* Mapping over the access array to display cards */}
      {access.map((canAccess, index) =>
        // Conditionally rendering a card only if the user has access
        canAccess ? (
          // Each card is given a unique key based on its index
          <div key={index} className="card">
            {/* Displaying the card's title */}
            <div className="card-title">Card {index + 1}</div>
          </div>
        ) : null // If the user does not have access, nothing is rendered for this card
      )}
    </div>
  );
};

export default CardDisplay;
