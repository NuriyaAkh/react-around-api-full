import React from 'react';
import successIcon from '../images/Checkmark.svg';
import errorIcon from '../images/ErrorIcon.svg';

const InfoToolTip = ({isOpen, onClose, status}) => {
  return (
    <div className={`forms ${isOpen ? 'forms_is-open' : ''}`}>
      <div className="forms__container">
        <button
          aria-label="close"
          type="button"
          className="forms__button-close"
          onClick={onClose}
        />
        <div className="form">
          {status === 'success' ? (
            <div>
              <img
                className="form__icon"
                src={successIcon}
                alt="checkmark icon"
              />
              <p className="form__status-message">
                Success! You have now been registered.
              </p>
            </div>
          ) : (
            <div>
              <img className="form__icon" src={errorIcon} alt="error icon" />
              <p className="form__status-message">
                Oops, something went wrong! Please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default InfoToolTip;
