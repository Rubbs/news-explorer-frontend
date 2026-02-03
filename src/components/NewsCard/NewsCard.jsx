import "./NewsCard.css";
import placeholderImage from "../../assets/placeholder.png";
import bookmark from "../../assets/bookmark.svg";
import bookmarkActive from "../../assets/bookmarkactive.svg";
import deleteIcon from "../../assets/trash.png";

function NewsCard({
  card,
  isLoggedIn,
  onSave,
  onDelete,
  savedArticles = [],
  isSavedPage = false,
}) {
  const { title, description, urlToImage, publishedAt, source } = card;

  const isSaved = savedArticles.some((item) => item.title === card.title);

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const handleClick = () => {
    // If on saved articles page, delete the article
    if (isSavedPage) {
      onDelete(card);
      return;
    }
    // If not logged in, do nothing
    if (!isLoggedIn) return;
    // Toggle save/delete based on current state
    if (isSaved) {
      onDelete(card);
    } else {
      onSave(card);
    }
  };

  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img
          src={urlToImage || placeholderImage}
          alt={title || "News article"}
          className="news-card__image"
        />

        <button
          className={`news-card__save-button ${
            isSaved && !isSavedPage ? "news-card__save-button_active" : ""
          }`}
          onClick={handleClick}
        >
          <img
            src={isSavedPage ? deleteIcon : isSaved ? bookmarkActive : bookmark}
            alt={isSavedPage ? "Delete article" : "Save article"}
          />

          {!isLoggedIn && !isSavedPage && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}

          {isSavedPage && (
            <span className="news-card__tooltip">Remove from saved</span>
          )}
        </button>
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{formattedDate}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source?.name?.toUpperCase()}</p>
      </div>
    </li>
  );
}

export default NewsCard;
