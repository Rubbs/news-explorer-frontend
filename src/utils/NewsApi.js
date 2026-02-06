// src/utils/NewsApi.js

const API_KEY = "4adcbd26064d4fc79eec3f3b789c1d68";

const BASE_URL =
  process.env.NODE_ENV === "production"
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
