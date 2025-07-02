// backend/controllers/news.controller.js
import axios from 'axios';

export const getTopHeadlines = async (req, res) => {
  try {
    const category = req.query.category || 'general';

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines`,
      {
        params: {
          country: 'in',
          category,
          apiKey: process.env.NEWS_API_KEY,
        },
      }
    );

    res.status(200).json(response.data.articles);
  } catch (err) {
    console.error('❌ NewsAPI fetch failed:', err.message);
    res.status(500).json({ error: 'News fetch failed' });
  }
};
