// src/api/news.jsx
export const fetchNewsApi = async (searchQuery = "technology") => {
  const apiKey = "7cbc87b81a1ffe46e888c7c5d7fad7da";
  
  // 1. Construct the GNews URL normally
  const originalUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=en&image=required&apikey=${apiKey}`;

  // 2. THE FIX: Use a CORS Proxy
  // This service "corsproxy.io" acts as a polite middleman to fetch the data for you.
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(originalUrl)}`;

  try {
    // We fetch the PROXY URL, not the original one
    const response = await fetch(proxyUrl);
    const data = await response.json();

    // Debugging: Check if we hit the daily limit
    if (data.errors) {
      console.error("API Error:", data.errors);
      // If you see "Forbidden" here, it means you hit the 100 request limit for today.
      return [];
    }

    // Data mapping (Translator)
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