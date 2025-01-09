import express from "express";
import { generateContent } from "../../Controllers/geminiController.js";
import { isAuthenticated } from "../../Middlewares/authMiddleware.js";
const router = express.Router();
router.get('/prompt', isAuthenticated,  generateContent);
export default router;