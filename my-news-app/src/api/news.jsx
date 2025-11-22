export default async function handler(req, res) {
  const { query } = req.query;

  const apiUrl = `https://newsapi.org/v2/everything?q=${query}&searchIn=title&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
