// src/api/news.jsx
export const fetchNewsApi = async (searchQuery = "technology") => {
  const apiKey = "d9ec7b7479844dd582b14074e1f54703"; 
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("API Response:", data); // Check your console to see this!

    if (data.status !== "ok") {
      console.error("API Error:", data.message); // Log if API denies request
      return [];
    }

    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};