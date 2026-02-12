import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  cards,
  isLoggedIn,
  onSave,
  onDelete,
  savedArticles,
  isSavedPage = false,
}) {
  return (
    <section className="news-card-list">
      <ul className="news-card-list__container">
        {cards.map((card) => (
          <NewsCard
            key={card.uid}
            card={card}
            isLoggedIn={isLoggedIn}
            onSave={onSave}
            onDelete={onDelete}
            savedArticles={savedArticles}
            isSavedPage={isSavedPage}
          />
        ))}
      </ul>
    </section>
  );
}

export default NewsCardList;
