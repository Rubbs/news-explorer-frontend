import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import NewsCardList from "./components/NewsCardList/NewsCardList";
import SavedNews from "./components/SavedNews/SavedNews";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Preloader from "./components/Preloader/Preloader";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import SuccessModal from "./components/SuccessModal/SuccessModal";
import MobileMenuModal from "./components/MobileMenuModal/MobileMenuModal";

import { searchNews } from "./utils/NewsApi";
import { authorize } from "./utils/auth";

import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState(() => {
    const saved = localStorage.getItem("savedArticles");
    return saved ? JSON.parse(saved) : [];
  });

  const location = useLocation();
  const navigate = useNavigate();
  const isSavedPage = location.pathname === "/saved-news";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);

  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenMobileMenu = () => setIsMobileMenuOpen(true);
  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    setIsLoggedIn(true);
    setCurrentUser({ name: "Rubi" });

    const saved = localStorage.getItem("savedArticles");
    setSavedCards(saved ? JSON.parse(saved) : []);
  }, []);

  useEffect(() => {
    if (!isLoggedIn && location.pathname === "/saved-news") {
      navigate("/");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const handleLogin = (email, password) => {
    authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setCurrentUser({ email, name: "Rubi" });

        const saved = localStorage.getItem("savedArticles");
        setSavedCards(saved ? JSON.parse(saved) : []);

        setIsLoginOpen(false);
        setIsMobileMenuOpen(false);

        navigate("/saved-news");
      })
      .catch(() => setError("Login failed"));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);

    setCards([]);
    setHasSearched(false);
    setNothingFound(false);

    setError("");

    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsSuccessOpen(false);
  };

  const handleSearch = (keyword) => {
    setLoading(true);
    setHasSearched(true);
    setNothingFound(false);
    setError("");
    setVisibleCount(3);

    searchNews(keyword)
      .then((data) => {
        const articles = (data.articles || []).map((article) => ({
          ...article,
          uid: article.url,
        }));

        articles.length ? setCards(articles) : setNothingFound(true);
      })
      .catch(() =>
        setError(
          "Sorry, something went wrong during the request. Please try again later.",
        ),
      )
      .finally(() => setLoading(false));
  };

  const handleSaveCard = (card) => {
    const alreadySaved = savedCards.some((item) => item.uid === card.uid);
    if (alreadySaved) return;

    const updated = [...savedCards, card];
    setSavedCards(updated);
    localStorage.setItem("savedArticles", JSON.stringify(updated));
  };

  const handleDeleteCard = (card) => {
    const updated = savedCards.filter((item) => item.uid !== card.uid);
    setSavedCards(updated);
    localStorage.setItem("savedArticles", JSON.stringify(updated));
  };

  const handleSignInFromSuccess = () => {
    setIsSuccessOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="hero">
                <Header
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onLogin={openLogin}
                  onLogout={handleLogout}
                  isSavedPage={isSavedPage}
                  isMobileMenuOpen={isMobileMenuOpen}
                  onOpenMobileMenu={handleOpenMobileMenu}
                  onCloseMobileMenu={handleCloseMobileMenu}
                />
                <Main onSearch={handleSearch} />
              </section>

              {hasSearched && (
                <section className="search-results">
                  {loading ? (
                    <Preloader />
                  ) : error ? (
                    <p className="search-results__error">{error}</p>
                  ) : nothingFound ? (
                    <div className="search-results__empty">
                      <div className="search-results__icon"></div>
                      <h3 className="search-results__empty-title">
                        Nothing found
                      </h3>
                      <p className="search-results__empty-text">
                        Sorry, but nothing matched your search terms.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="search-results__title">Search results</h2>

                      <NewsCardList
                        cards={cards.slice(0, visibleCount)}
                        isLoggedIn={isLoggedIn}
                        onSave={handleSaveCard}
                        onDelete={handleDeleteCard}
                        savedArticles={savedCards}
                      />

                      {cards.length > visibleCount && (
                        <button
                          className="search-results__show-more"
                          onClick={() => setVisibleCount((v) => v + 3)}
                        >
                          Show more
                        </button>
                      )}
                    </>
                  )}
                </section>
              )}

              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/saved-news"
          element={
            <>
              <Header
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onLogin={openLogin}
                onLogout={handleLogout}
                isSavedPage={true}
                onOpenMobileMenu={handleOpenMobileMenu}
              />

              <SavedNews
                cards={savedCards}
                onDelete={handleDeleteCard}
                currentUser={currentUser}
              />

              <Footer />
            </>
          }
        />
      </Routes>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeModals}
        onLogin={handleLogin}
        onSwitch={openRegister}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={closeModals}
        onRegister={() => {
          setIsRegisterOpen(false);
          setIsSuccessOpen(true);
        }}
        onSwitch={openLogin}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        onSignIn={handleSignInFromSuccess}
      />

      <MobileMenuModal
        isOpen={isMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        onClose={handleCloseMobileMenu}
        onLogin={openLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
