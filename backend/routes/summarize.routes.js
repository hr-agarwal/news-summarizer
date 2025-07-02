// backend/routes/summarize.routes.js

import express from 'express';
import { summarizeArticle } from '../controllers/summarizer.controller.js';

const router = express.Router();

// POST /api/summarize
router.post('/', summarizeArticle);

export default router;
