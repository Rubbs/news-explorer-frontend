import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation({
  isLoggedIn,
  currentUser,
  onLogin,
  onLogout,
  isSavedPage,
}) {
  return (
    <nav className={`navigation ${isSavedPage ? "navigation_saved" : ""}`}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link_active" : ""}`
        }
      >
        Home
      </NavLink>

      {isLoggedIn ? (
        <>
          <NavLink
            to="/saved-news"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Saved articles
          </NavLink>

          <button className="navigation__user" type="button" onClick={onLogout}>
            {currentUser?.name}
            <span className="navigation__logout-icon" />
          </button>
        </>
      ) : (
        <button className="navigation__button" type="button" onClick={onLogin}>
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
