import express from 'express';
import { signUp , signIn, getAllUsers, getFeedForUser , getAllPostFeedForUser, verifyToken, deleteUser, verifyOTP, changeAccountPassword} from '../../Controllers/userController.js';
import { isAuthenticated } from '../../Middlewares/authMiddleware.js';
import { sendOTP } from '../../Controllers/userController.js';
import { emailValidator } from '../../Validators/emailValidator.js';
import { validRequestForChangePassword } from '../../Middlewares/changePassword.js';
const router = express.Router();
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/all', isAuthenticated, getAllUsers);
router.get('/feed', isAuthenticated, getFeedForUser);
router.get('/feedall', isAuthenticated, getAllPostFeedForUser);
router.get('/verifytoken', verifyToken);
router.delete('/deleteUser', isAuthenticated, deleteUser);
router.post('/sendotp',emailValidator, sendOTP);
router.post('/verifyotp', emailValidator, verifyOTP);
router.post('/changeaccountpassword', emailValidator, validRequestForChangePassword , changeAccountPassword);
export default router;