import EditIcon from '../images/edit-avatar-logo.svg';
import AddSign from '../images/+.svg';
import React, {useContext} from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__img-container">
          <img
            className="profile__img"
            src={currentUser.avatar}
            alt="profile"
          />
          <div className="profile__img-edit-logo">
            <img
              className="profile__img-icon"
              src={EditIcon}
              alt="edit avatar icon"
              onClick={onEditAvatarClick}
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              aria-label="edit profile"
              type="button"
              className="profile__button-name-edit"
              onClick={onEditProfileClick}
            />
            <p className="profile__about">{currentUser.about}</p>
          </div>

          <button
            aria-label="add"
            type="button"
            className="profile__button-add"
            onClick={onAddPlaceClick}
          >
            <img className="profile__add-img" src={AddSign} alt="add sidn" />
          </button>
        </div>
      </section>
      <section className="cards">
        <ul className="cards__container">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
