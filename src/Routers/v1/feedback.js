import express from 'express';
import { postFeedback } from '../../Controllers/feedbackController.js';
import { isAuthenticated } from '../../Middlewares/authMiddleware.js';
const router = express.Router();
router.post('/post',isAuthenticated, postFeedback);
export default router;
