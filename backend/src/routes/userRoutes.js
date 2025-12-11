import express from 'express';
import { getProfile, sumarStats, enrollCourse } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.post('/sumar', protect, sumarStats);
router.post('/enroll', protect, enrollCourse);

export default router;
