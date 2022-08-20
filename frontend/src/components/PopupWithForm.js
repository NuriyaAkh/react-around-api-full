import React, {useRef, useState, useEffect} from 'react';

export default function PopupWithForm({
  title,
  name,
  isOpen,
  onSubmit,
  buttonText,
  onClose,
  children,
  
}) {
  const [isFormValid, setFormValid] = useState(false);
  const formRef = useRef();
  useEffect(() => {
    setFormValid(formRef.current.checkValidity());
  }, [children]);

  return (
    <div className={`forms ${isOpen ? 'forms_is-open' : ''}`}>
      <div className="forms__container">
        <button
          aria-label="close"
          type="button"
          className="forms__button-close"
          onClick={onClose}
        />
        <h3 className="forms__title">{title}</h3>
        <form 
          className="form" 
          name={name} 
          onSubmit={onSubmit}
          ref={formRef}
          noValidate
        >
          {children}
        <button
            type="submit"
            className={`form__button ${
              !isFormValid ? 'form__button_disabled' : ''
            }`}
            disabled={!isFormValid}
            
        >
            {buttonText}
        </button>
        </form>
      </div>
    </div>
  );
}
