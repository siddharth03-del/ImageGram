import express from "express";
import { isAuthenticated } from "../../Middlewares/authMiddleware.js";
import { createComment } from "../../Controllers/commentController.js";
const router = express.Router();
router.post('/', isAuthenticated , createComment);
export default router;