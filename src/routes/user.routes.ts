import { Router } from 'express';

import { getAllUsers, getCurrentUser } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { restrictTo } from '../middlewares/rbac.middleware.js';

const router = Router();

router.get('/all', protect, restrictTo('admin'), getAllUsers);
router.get('/me', protect, getCurrentUser);

export default router;
