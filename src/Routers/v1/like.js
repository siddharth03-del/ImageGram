import express from 'express'
import { isAuthenticated } from '../../Middlewares/authMiddleware.js';
import { createPostLike, createCommentLike } from '../../Controllers/likeController.js';
const router = express.Router();
router.post('/post', isAuthenticated, createPostLike);
router.post('/comment', isAuthenticated, createCommentLike);
export default router;