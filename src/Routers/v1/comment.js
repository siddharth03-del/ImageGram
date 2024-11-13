import express from "express";
import { isAuthenticated } from "../../Middlewares/authMiddleware.js";
import { createComment, showComments , showReplies, showComment} from "../../Controllers/commentController.js";
const router = express.Router();
router.post('/create', isAuthenticated , createComment);
router.get('/showall', isAuthenticated, showComments);
router.get('/showone', isAuthenticated, showComment);
router.get('/showreplies', isAuthenticated, showReplies);
export default router;