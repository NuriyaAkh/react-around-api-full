import React from "react";
export default function ImagePopup({card, onClose}) {
  return (
    <div className={`forms ${card ? 'forms_is-open' : ''}`}>
      <div className="forms__image-big">
        <button
          aria-label="close"
          type="button"
          className="forms__button-close"
          onClick={onClose}
        />
        <img
          className="forms__image"
          alt={card ? card.name : ''}
          src={card ? card.link : ''}
        />
        <h3 className="forms__image-title">{card ? card.name : ''} </h3>
      </div>
    </div>
  );
}
