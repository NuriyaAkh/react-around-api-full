import React from 'react';
import PopupWithForm from './PopupWithForm';
import {useState, useEffect} from 'react';

export default function EditAvatarPopup({
  isOpen,
  onUpdate,
  onClose,
  buttonText,
}) {
  const [isNewAvatarUrlValid, setIsNewAvatarUrlValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState({avatar: ' '});
  const [avatar, setAvatar] = useState('');

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
    if (e.target.checkValidity()) {
      setIsNewAvatarUrlValid(true);
    } else {
      setIsNewAvatarUrlValid(false);
    }
    setErrorMessage({avatar: e.target.validationMessage});
  }
  function handleFormSubmit(evt) {
    evt.preventDefault();

    onUpdate({
      avatar,
    });
  }
  useEffect(() => {
    setAvatar('');
  }, [isOpen]);
  return (
    <PopupWithForm
      title="Change profile picture"
      name="avatar-form"
      onSubmit={handleFormSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      activeButton={isNewAvatarUrlValid}
      children={
        <>
          <input
            type="URL"
            className={`form__input ${
              isNewAvatarUrlValid ? '' : 'form__input_type_error'
            }`}
            id="avatar-link"
            name="avatar"
            placeholder="New Image URL"
            required
            onChange={handleAvatarChange}
            value={avatar || ''}
          />

          <span
            className={`avatar-link-input-error ${
              isNewAvatarUrlValid ? '' : 'form__error-text_active'
            }`}
          >
            {errorMessage.avatar}
          </span>
        </>
      }
    />
  );
}
