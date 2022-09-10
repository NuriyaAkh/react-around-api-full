import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
console.log("card owner",card.owner);
console.log("current user", currentUser._id )
  // Checking if the current user is the owner of the current card
  const isOwn = card.owner === currentUser._id;
//console.log("why it is not a list of cards",card);
  // Check if the card was liked by the current user
  const isLiked = card.likes.some((cardLiker) => cardLiker === currentUser._id);

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? 'card__delete' : 'card__delete_hidden'
  }`;
  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = isLiked
    ? 'card__button card__button_active'
    : 'card__button';

  function handleImageClick() {
    onCardClick(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card">
      <img
        className="card__img"
        src={card.link}
        alt={card.name}
        onClick={handleImageClick}
      />
      <button
        aria-label="delete image button"
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button
            aria-label="like image"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="card__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
