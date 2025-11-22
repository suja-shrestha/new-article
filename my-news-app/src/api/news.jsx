// src/api/news.jsx
export const fetchNewsApi = async (searchQuery = "technology") => {
  const apiKey = "d9ec7b7479844dd582b14074e1f54703"; // ideally use env variable
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&searchIn=title&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "ok") {
      return [];
    }

    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
