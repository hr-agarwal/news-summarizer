import React, { useState, useEffect } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import ArticleCard from '../components/ArticleCard';
import ArticleDetail from '../components/ArticleDetail';
import { fetchArticlesByCategory } from '../services/newsAPI';
import styles from './Home.module.css';

const Home = ({ searchQuery }) => {
  const [category, setCategory] = useState('general');
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadArticles = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchArticlesByCategory(category);
      setArticles(data);
    } catch (err) {
      console.error('❌ Error fetching articles:', err.message);
      setError('Failed to load articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [category]);

  // 🔍 Filter articles based on searchQuery
 const filteredArticles = articles.filter((article) => {
  const keyword = searchQuery.trim().toLowerCase();
  const title = article.title?.toLowerCase() || '';
  const description = article.description?.toLowerCase() || '';
  const content = article.content?.toLowerCase() || '';

  return (
    keyword === '' ||
    title.includes(keyword) ||
    description.includes(keyword) ||
    content.includes(keyword)
  );
});


  return (
    <div className={styles.home}>
      <CategoryTabs
        selectedCategory={category}
        onSelectCategory={(newCategory) => {
          setCategory(newCategory);
          setSelectedArticle(null);
        }}
      />

      {(loading || error) && (
        <div className={styles.messageWrapper}>
          <p className={styles.message}>
            {loading ? 'Loading...' : error}
          </p>
        </div>
      )}

      {!loading && !error && !selectedArticle && (
        <div className={styles.cardGrid}>
          {filteredArticles.map((article, index) => (
            <ArticleCard
              key={index}
              article={article}
              onClick={setSelectedArticle}
            />
          ))}
        </div>
      )}

      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default Home;
