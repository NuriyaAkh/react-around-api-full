import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmationPopup({
  isOpen,
  onUpdate,
  onClose,
  card,
  buttonText,
}) {
  function handleCardDeleteSubmit(evt) {
    evt.preventDefault();
    onUpdate(card);
  }

  return (
    <PopupWithForm
      title="Are you sure?"
      name="confirm-form"
      formId="confirm-form"
      buttonText={buttonText}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleCardDeleteSubmit}
    />
  );
}
