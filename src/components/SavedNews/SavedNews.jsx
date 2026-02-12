import "./SavedNews.css";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ cards, onDelete, currentUser }) {
  const keywords = [...new Set(cards.map((card) => card.keyword))];

  return (
    <section className="saved-news">
      <div className="saved-news__header">
        <p className="saved-news__subtitle">Saved articles</p>

        <h2 className="saved-news__title">
          {currentUser?.name
            ? `${currentUser.name}, you have ${cards.length} saved articles`
            : `You have ${cards.length} saved articles`}
        </h2>

        {keywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords:{" "}
            <strong>
              {keywords.slice(0, 2).join(", ")}
              {keywords.length > 2 && `, and ${keywords.length - 2} others`}
            </strong>
          </p>
        )}
      </div>

      {cards.length > 0 ? (
        <NewsCardList
          cards={cards}
          isSavedPage={true}
          onDelete={onDelete}
          savedArticles={cards}
        />
      ) : (
        <p className="saved-news__empty">No saved articles yet</p>
      )}
    </section>
  );
}

export default SavedNews;
