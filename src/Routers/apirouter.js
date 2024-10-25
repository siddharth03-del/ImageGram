import express from 'express';
import v1Router from '../Routers/v1/v1router.js'
const router = express.Router();
router.use('/v1', v1Router);
export default router;