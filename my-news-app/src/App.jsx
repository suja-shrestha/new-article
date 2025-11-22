import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("technology");
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async () => {
    setIsLoading(true);
    setArticles([]);

    try {
      const res = await fetch(`/api/news?search=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-content">
          <h1>📰 Global News</h1>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      <div className="news-list">
        {isLoading && (
          <div className="loading-container">
            <div className="spinner-wrapper">
              <div className="spinner"></div>
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-text">Fetching latest news...</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {!isLoading && articles.length === 0 && (
          <p style={{ textAlign: "center" }}>No articles found.</p>
        )}

        {!isLoading && articles.map((article, index) => (
          <div key={index} className="card">
            {article.urlToImage && (
              <img src={article.urlToImage} alt="news-img" />
            )}
            <div className="card-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
