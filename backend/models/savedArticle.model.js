import mongoose from 'mongoose';

const savedArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  source: { type: String },
  url: { type: String },
  imageUrl: { type: String },
  category: { type: String },
  savedAt: { type: Date, default: Date.now }
});

const SavedArticle = mongoose.model('SavedArticle', savedArticleSchema);

export default SavedArticle;
