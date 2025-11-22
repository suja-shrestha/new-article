export const fetchNewsApi = async (searchQuery = "technology") => {
  const apiKey = "7cbc87b81a1ffe46e888c7c5d7fad7da"; // Your GNews Key
  
  // GNews URL structure (different from NewsAPI)
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=en&image=required&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Debugging: Log to see if it works
    console.log("GNews Response:", data);

    // GNews returns an 'errors' object if something is wrong
    if (data.errors) {
      console.error("GNews API Error:", data.errors);
      return [];
    }

    // GNews uses 'image' instead of 'urlToImage', so we map it to match your App.jsx
    const formattedArticles = (data.articles || []).map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image, // <--- FIX: GNews calls it 'image', your App expects 'urlToImage'
      publishedAt: article.publishedAt,
      source: article.source
    }));

    return formattedArticles;

  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};