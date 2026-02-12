// src/utils/NewsApi.js

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

if (!API_KEY) {
  console.error("Missing News API key. Check your .env file.");
}

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

// format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// get last 7 days range
function getDateRange() {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  return {
    from: formatDate(sevenDaysAgo),
    to: formatDate(today),
  };
}

function request(url) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  });
}

export function searchNews(keyword) {
  const { from, to } = getDateRange();

  const url = `${BASE_URL}?q=${keyword}&from=${from}&to=${to}&pageSize=100&apiKey=${API_KEY}`;

  return request(url);
}
