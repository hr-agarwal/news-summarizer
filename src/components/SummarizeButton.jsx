import React, { useState } from 'react';
import styles from './SummarizeButton.module.css';
import { summarizeArticle } from '../services/geminiAPI';

const SummarizeButton = ({ article }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    setError('');
    setSummary(null);

    try {
      const textToSummarize = `${article.title}\n\n${article.description || ''}\n\n${article.content || ''}`;
      const result = await summarizeArticle(textToSummarize);
      setSummary(result);
    } catch (err) {
      setError('Failed to summarize. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.summarizeContainer}>
      <button className={styles.button} onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {summary && (
        <ul className={styles.summary}>
          {summary.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SummarizeButton;
