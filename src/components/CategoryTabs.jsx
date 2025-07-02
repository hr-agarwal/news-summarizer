import React from 'react';
import styles from './CategoryTabs.module.css';

const categories = ['general', 'business', 'technology', 'health', 'science', 'sports', 'entertainment'];

const CategoryTabs = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className={styles.tabContainer}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.tab} ${selectedCategory === cat ? styles.active : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
