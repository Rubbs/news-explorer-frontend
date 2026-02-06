import "./SuccessModal.css";

function SuccessModal({ isOpen, onClose, onSignIn }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="success-modal">
        <button className="modal__close" type="button" onClick={onClose}>
          ×
        </button>

        <h2 className="success-modal__title">
          Registration successfully complete!
        </h2>

        <button
          className="success-modal__signin"
          type="button"
          onClick={onSignIn}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
