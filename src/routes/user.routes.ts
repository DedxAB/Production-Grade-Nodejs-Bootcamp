import { Router } from 'express';

import { getAllUsers, getCurrentUser } from '../controllers/user.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.get('/all', protect, restrictTo('admin'), getAllUsers);
router.get('/me', protect, getCurrentUser);

export default router;
