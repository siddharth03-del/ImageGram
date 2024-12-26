import express from 'express';
import { createPost, getAllPosts, deletePost, updatePost, deletePostFromCloud , getSinglePost} from '../../Controllers/postcontroller.js';
import { parser } from '../../Config/cloudinaryconfig.js';
import { imagevalidate } from '../../Validators/imageValidator.js';
import { isAuthenticated } from '../../Middlewares/authMiddleware.js';
const router = express.Router();
const errorHandler = (err, req, res, next) => { 
    console.error(err.stack); // Log the error 
    res.status(500).json({ message: err.message }); // Send error response
    };
router.post('/', isAuthenticated ,parser.single('image'),imagevalidate, createPost , errorHandler);
router.delete('/', isAuthenticated , deletePost);
router.get('/', isAuthenticated , getAllPosts);
router.get('/single', isAuthenticated, getSinglePost);
router.put('/:id', isAuthenticated , parser.single('image'), deletePostFromCloud ,updatePost);
export default router;