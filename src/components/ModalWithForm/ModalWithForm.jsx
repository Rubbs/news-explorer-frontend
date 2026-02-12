// src/components/ModalWithForm/ModalWithForm.jsx
import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
  submitText,
  switchText,
  onSwitch,
  isSubmitDisabled,
}) {
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <button type="button" className="modal__close" onClick={onClose}>
        ×
      </button>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <button
            type="submit"
            className={`modal__submit ${
              isSubmitDisabled ? "modal__submit_disabled" : ""
            }`}
            disabled={isSubmitDisabled}
          >
            {submitText}
          </button>
        </form>

        {switchText && (
          <p className="modal__switch">
            or{" "}
            <span className="modal__switch-link" onClick={onSwitch}>
              {switchText}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default ModalWithForm;
