import express from 'express';
import { isAuthenticated } from '../../Middlewares/authMiddleware.js';
import { getAllMessages } from '../../Controllers/messageController.js';
const router = express.Router();
router.get('/getAll', isAuthenticated, getAllMessages);
export default router;