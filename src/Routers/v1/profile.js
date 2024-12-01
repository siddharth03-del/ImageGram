import express from 'express';
import { deleteProfilePictureFromCloud, getProfileUpdate } from '../../Controllers/profileController.js';
import { isAuthenticated } from '../../Middlewares/authMiddleware.js';
import { parser } from '../../Config/cloudinaryconfig.js';
import { getProfile , getExploreProfile} from '../../Controllers/profileController.js';
const router = express.Router();
router.post('/update', isAuthenticated, parser.single('image'), deleteProfilePictureFromCloud ,getProfileUpdate);
router.get('/getProfile', isAuthenticated, getProfile);
router.get('/exploreProfile', isAuthenticated, getExploreProfile);
export default router;