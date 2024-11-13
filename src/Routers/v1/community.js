import express from 'express';
import { isAuthenticated } from '../../Middlewares/authMiddleware.js';
import { followUser,  unFollowUser} from '../../Controllers/communityController.js';
const router = express.Router();
router.put('/follow',isAuthenticated ,followUser);
router.put('/unfollow',isAuthenticated , unFollowUser);
export default router;