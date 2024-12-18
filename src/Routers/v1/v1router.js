import express from 'express'
import postRouter from './post.js'
import userRouter from './user.js'
import commentRouter from './comment.js'
import likeRouter from './like.js'
import communityRouter from './community.js';
import profileRouter from './profile.js';
const router = express.Router();
router.use('/comments', commentRouter);
router.use('/posts', postRouter);
router.use('/user', userRouter);
router.use('/like', likeRouter);
router.use('/community', communityRouter);
router.use('/profile', profileRouter);
export default router;