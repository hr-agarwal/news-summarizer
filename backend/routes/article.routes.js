import express from 'express';
import { saveArticle, getSavedArticles } from '../controllers/article.controller.js';

const router = express.Router();
router.post('/', saveArticle);
router.get('/', getSavedArticles);
export default router;
