import SavedArticle from '../models/savedArticle.model.js';

export const saveArticle = async (req, res) => {
  try {
    const { title, summary, source, url, imageUrl, category } = req.body;
    if (!title || !summary) return res.status(400).json({ error: 'Title and summary are required.' });

    const article = new SavedArticle({ title, summary, source, url, imageUrl, category });
    await article.save();
    res.status(201).json({ message: 'Article saved successfully', article });
  } catch (err) {
    console.error('❌ Error saving article:', err.message);
    res.status(500).json({ error: 'Failed to save article' });
  }
};

export const getSavedArticles = async (req, res) => {
  try {
    const articles = await SavedArticle.find().sort({ savedAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    console.error('❌ Error fetching articles:', err.message);
    res.status(500).json({ error: 'Failed to retrieve articles' });
  }
};
