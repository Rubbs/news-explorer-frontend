import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const isFormValid = email && password && !emailError;

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onLogin(email, password);
  };

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Sign in"
      switchText="Sign up"
      onSwitch={onSwitch}
      isSubmitDisabled={!isFormValid}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          required
        />
        {emailError && <span className="modal__error">{emailError}</span>}
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
