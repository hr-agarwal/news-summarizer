// src/services/articleAPI.js

export const saveArticleToDB = async (articleData) => {
  try {
    const res = await fetch('http://localhost:5000/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });

    const result = await res.json();
    return result;
  } catch (err) {
    console.error('❌ Failed to save article:', err.message);
    return null;
  }
};
