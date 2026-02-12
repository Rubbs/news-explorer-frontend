let savedArticles = [];

export const getItems = () => {
  return Promise.resolve(savedArticles);
};

export const saveArticle = (article) => {
  const saved = { ...article, _id: Date.now().toString() };
  savedArticles.push(saved);
  return Promise.resolve(saved);
};

export const deleteArticle = (id) => {
  savedArticles = savedArticles.filter((a) => a._id !== id);
  return Promise.resolve();
};
