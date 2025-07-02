import React from 'react';
import styles from './ArticleCard.module.css';

const ArticleCard = ({ article, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(article)}>
    <img
  src={article.urlToImage}
  alt={article.title}
  className={styles.image}
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
  }}
/>


      <div className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.source}>{article.source.name}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
