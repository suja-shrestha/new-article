// src/api/news.jsx
export const fetchNewsApi = async (searchQuery = "technology") => {
  
  // 1. Your Key is HARDCODED here. This is fine for now!
  const apiKey = "7cbc87b81a1ffe46e888c7c5d7fad7da"; 
  
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=en&image=required&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.errors) {
      console.error("API Error:", data.errors);
      return [];
    }

    return (data.articles || []).map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image, 
      publishedAt: article.publishedAt,
      source: article.source
    }));

  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};