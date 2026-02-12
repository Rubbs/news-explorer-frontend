import { Link } from "react-router-dom";
import "./MobileMenuModal.css";

function MobileMenuModal({ isOpen, onClose, onLogin, onLogout, isLoggedIn }) {
  if (!isOpen) return null;

  return (
    <div className="mobile-menu" onClick={onClose}>
      {/* TOP DARK PANEL */}
      <div className="mobile-menu__panel" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu__header">
          <h2 className="mobile-menu__logo">NewsExplorer</h2>
          <button
            className="mobile-menu__close"
            type="button"
            aria-label="Close menu"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <nav className="mobile-menu__nav">
          <Link to="/" className="mobile-menu__link" onClick={onClose}>
            Home
          </Link>

          <button
            className="mobile-menu__button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (isLoggedIn) {
                onLogout();
              } else {
                onLogin();
              }

              onClose();
            }}
          >
            {isLoggedIn ? "Sign out" : "Sign in"}
          </button>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenuModal;
