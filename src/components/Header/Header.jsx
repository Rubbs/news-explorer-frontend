import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({
  isLoggedIn,
  currentUser,
  onLogin,
  onLogout,
  isSavedPage,
  onOpenMobileMenu,
}) {
  return (
    <header className={`header ${isSavedPage ? "header_white" : ""}`}>
      <h1 className="header__logo">
        <Link to="/" className="header__logo-link">
          NewsExplorer
        </Link>
      </h1>

      <div className="header__nav">
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogin={onLogin}
          onLogout={onLogout}
          isSavedPage={isSavedPage}
        />
      </div>
      <button
        className="header__menu-button"
        type="button"
        aria-label="Open menu"
        onClick={onOpenMobileMenu}
      >
        <span className="header__menu-line" />
        <span className="header__menu-line" />
      </button>
    </header>
  );
}

export default Header;
