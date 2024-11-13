import express from 'express'
import { isAuthenticated } from '../../Middlewares/authMiddleware.js';
import { createPostLike, createCommentLike } from '../../Controllers/likeController.js';
import { countLikeOnPost } from '../../Controllers/likeController.js';
import { isPostLikedByUser } from '../../Controllers/likeController.js';
const router = express.Router();
router.post('/post', isAuthenticated, createPostLike);
router.post('/comment', isAuthenticated, createCommentLike);
router.get('/countlikepost', isAuthenticated, countLikeOnPost);
router.get('/ispostliked', isAuthenticated, isPostLikedByUser);
export default router;