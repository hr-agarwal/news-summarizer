// backend/controllers/news.controller.js
import axios from 'axios';

export const getTopHeadlines = async (req, res) => {
  try {
    const category = req.query.category || 'general';
    const apiKey = process.env.VITE_NEWS_API_KEY;

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'in',
        category,
        apiKey,
      },
    });

    res.status(200).json(response.data.articles);
  } catch (err) {
    console.error('❌ NewsAPI fetch failed:', err.response?.data || err.message);
    res.status(500).json({ error: 'News fetch failed' });
  }
};
