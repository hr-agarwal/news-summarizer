// backend/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import summarizeRoutes from './routes/summarize.routes.js';
import newsRoutes from './routes/news.routes.js'; // ✅ Add this line
import SavedArticle from './models/savedArticle.model.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/summarize', summarizeRoutes);
app.use('/api/news', newsRoutes); // ✅ Register the news route

// MongoDB test route
app.get('/test-mongo', async (req, res) => {
  try {
    const test = await SavedArticle.create({
      title: 'Test Article',
      summary: 'This is a test summary.',
      source: 'Tester',
      url: 'https://example.com',
      imageUrl: 'https://source.unsplash.com/random/300x200',
      category: 'Test'
    });

    res.status(200).json({ success: true, id: test._id });
  } catch (err) {
    console.error('❌ Mongo test failed:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
