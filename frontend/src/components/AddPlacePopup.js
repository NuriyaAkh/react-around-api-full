import React from 'react';
import PopupWithForm from './PopupWithForm';
import {useState} from 'react';
export default function AddPlacePopup({isOpen, onUpdate, onClose, buttonText}) {
  const [cardTitle, setCardTitle] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [isCardTitleValid, setIsCardTitleValid] = useState(true);
  const [isImageLinkValid, setIsImageLinkValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    cardTitle: ' ',
    imageLink: ' ',
  });

  function handleFormSubmit(evt) {
    evt.preventDefault();
    onUpdate({
      name: cardTitle,
      link: imageLink,
    });
  }
  function handleCardTitleChange(e) {
    setCardTitle(e.target.value);
    if (e.target.checkValidity()) {
      setIsCardTitleValid(true);
    } else {
      setIsCardTitleValid(false);
    }
    //setIsCardTitleValid(e.target.validity.valid);
    setErrorMessage({cardTitle: e.target.validationMessage});
  }
  function handleImageLinkChange(e) {
    setImageLink(e.target.value);
    if (e.target.checkValidity()) {
      setIsImageLinkValid(true);
    } else {
      setIsImageLinkValid(false);
    }
    // setIsImageLinkValid(e.target.validity.valid);
    setErrorMessage({imageLink: e.target.validationMessage});
  }
  React.useEffect(() => {
    setCardTitle('');
    setImageLink('');
}, [isOpen]);
  return (
    <PopupWithForm
      title="New place"
      name="add-form"
      formId="img-add"
      buttonText={buttonText}
      onSubmit={handleFormSubmit}
      isOpen={isOpen}
      onClose={onClose}
      activeButton={isCardTitleValid && isImageLinkValid}
      children={
        <>
          <input
            type="text"
            className={`form__input ${
              isCardTitleValid ? '' : 'form__input_type_error'
            }`}
            id="title"
            name="name"
            placeholder="Title"
            minLength="1"
            maxLength="30"
            required
            onChange={handleCardTitleChange}
            value={cardTitle || ''}
          />
          <span
            className={`title-input-error ${
              isCardTitleValid ? '' : 'form__error-text_active'
            }`}
          >
            {errorMessage.cardTitle}
          </span>
          <input
            type="URL"
            className={`form__input ${
              isImageLinkValid ? '' : 'form__input_type_error'
            }`}
            id="image-link"
            name="link"
            placeholder="Image link"
            required
            onChange={handleImageLinkChange}
            value={imageLink || ''}
          />
          <span
            className={`image-link-input-error ${
              isImageLinkValid ? '' : 'form__error-text_active'
            }`}
          >
            {errorMessage.imageLink}
          </span>
        </>
      }
    />
  );
}
