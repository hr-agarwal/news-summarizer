// backend/controllers/news.controller.js
import axios from 'axios';

export const getTopHeadlines = async (req, res) => {
  try {
    const category = req.query.category || 'general';
    const apiKey = process.env.NEWS_API_KEY;

    const response = await axios.get('https://gnews.io/api/v4/top-headlines?token=YOUR_KEY&lang=en&country=us', {
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
