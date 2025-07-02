const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const fetchArticlesByCategory = async (category = 'general') => {
  const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  const cat = validCategories.includes(category.toLowerCase()) ? category.toLowerCase() : 'general';

  const url = `https://newsapi.org/v2/everything?q=${cat}&pageSize=10&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log('📰 NewsAPI response:', data);

    if (data.status === 'ok' && data.articles?.length > 0) {
      return data.articles;
    } else {
      // fallback: try general
      if (cat !== 'general') {
        console.warn(`⚠️ No articles for ${cat}, retrying with general...`);
        return fetchArticlesByCategory('general');
      } else {
        throw new Error('No articles found');
      }
    }
  } catch (err) {
    console.error('❌ NewsAPI fetch error:', err.message);
    throw err;
  }
};


