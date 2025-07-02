import React, { useState } from 'react';
import styles from './ArticleDetail.module.css';
import { saveArticleToDB } from '../services/articleAPI';

const ArticleDetail = ({ article, onBack }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
console.log('📦 Article received:', article);
  if (!article) return null;

  const handleSummarize = async () => {
    setLoading(true);
    setSummary('');
    setSaved(false);

    try {
      const res = await fetch('http://localhost:5000/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: article.content || article.description }),
      });

      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
      } else {
        alert('Failed to summarize the article.');
      }
    } catch (err) {
      alert('Error summarizing article.');
    }

    setLoading(false);
  };

  const handleSave = async () => {
    const articleData = {
      title: article.title,
      summary: summary,
      source: article.source?.name || 'Unknown',
      url: article.url,
      imageUrl: article.urlToImage,
      category: article.category || 'General',
    };

    const result = await saveArticleToDB(articleData);
    if (result?.article) {
      setSaved(true);
      alert('✅ Article summary saved!');
    } else {
      alert('❌ Failed to save summary.');
    }
  };

  return (
    <div className={styles.detailContainer}>
      <button className={styles.backButton} onClick={onBack}>← Back to Articles</button>

      {/* Wrap content inside a translucent styled box */}
      <div className={styles.detailContent}>
        <h2 className={styles.title}>{article.title}</h2>

        <img
          src={article.urlToImage || 'https://via.placeholder.com/600x300?text=No+Image'}
          alt={article.title}
          className={styles.image}
        />

        <p className={styles.meta}>
          <strong>Source:</strong> {article.source.name} &nbsp;|&nbsp;
          <strong>Author:</strong> {article.author || 'Unknown'} &nbsp;|&nbsp;
          <strong>Date:</strong> {new Date(article.publishedAt).toLocaleString()}
        </p>

        <p className={styles.content}>{article.description || 'No description available.'}</p>

        <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
          🔗 Read Full Article
        </a>

        {/* Summarize + Save Section */}
        <div className={styles.summarizeSection}>
          <button onClick={handleSummarize} disabled={loading} className={styles.summarizeBtn}>
            {loading ? 'Summarizing...' : '🧠 Summarize Article'}
          </button>

          {summary && (
            <div className={styles.summaryBox}>
              <h3>📝 Summary</h3>
              <pre className={styles.summaryText}>{summary}</pre>
              <button onClick={handleSave} disabled={saved} className={styles.saveBtn}>
                {saved ? '✅ Saved' : '💾 Save Summary'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
