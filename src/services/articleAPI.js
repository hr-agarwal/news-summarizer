const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const saveArticleToDB = async (articleData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/articles`, {
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
