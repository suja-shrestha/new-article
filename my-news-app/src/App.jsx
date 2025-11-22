import { useState, useEffect } from "react";
import "./App.css";
// 1. IMPORT the helper function properly
import { fetchNewsApi } from "./api/news"; 

function App() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("technology");
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async () => {
    setIsLoading(true);
    setArticles([]); // Clear previous articles while loading

    try {
      // 2. REMOVE the fetch('/api/news...') line
      // 3. CALL the function directly
      const data = await fetchNewsApi(searchQuery);
      
      // 4. The helper function already returns the array of articles, 
      // so we can set it directly.
      setArticles(data); 
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
             <p className="loading-text">Fetching latest news...</p>
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