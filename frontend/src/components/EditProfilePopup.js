import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {useEffect, useState, useContext} from 'react';

export default function EditProfilePopup({
  isOpen,
  onUpdate,
  onClose,
  buttonText,
  buttonState,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    name: ' ',
    description: ' ',
  });

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser,isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
    //setIsNameValid(e.target.validity.valid);
    setErrorMessage({name: e.target.validationMessage});
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    if (e.target.checkValidity()) {
      setIsDescriptionValid(true);
    } else {
      setIsDescriptionValid(false);
    }
    //setIsDescriptionValid(e.target.validity.valid);
    setErrorMessage({description: e.target.validationMessage});
  }
  function handleFormSubmit(evt) {
    evt.preventDefault();
    onUpdate({
      username: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Edit Profile"
      name="edit-form"
      formId="edit-profile"
      onSubmit={handleFormSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      activeButton={isNameValid && isDescriptionValid}
      children={
        <>
          <input
            type="text"
            className={`form__input ${
              isNameValid ? '' : 'form__input_type_error'
            }`}
            id="username"
            name="username"
            placeholder="Name"
            required
            minLength="2"
            maxLength="40"
            value={name || ''}
            onChange={handleNameChange}
          />

          <span
            className={`username-input-error ${
              isNameValid ? '' : 'form__error-text_active'
            }`}
          >
            {errorMessage.name}
          </span>
          <input
            type="text"
            className="form__input "
            id="about"
            name="about"
            placeholder="About Me"
            required
            minLength="2"
            maxLength="200"
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          <span
            className={`about-input-error ${
              isDescriptionValid ? '' : 'form__error-text_active'
            }`}
          >
            {errorMessage.description}
          </span>
        </>
      }
    />
  );
}
