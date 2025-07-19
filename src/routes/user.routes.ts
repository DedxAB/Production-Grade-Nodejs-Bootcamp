import { Router } from 'express';

import { getAllUsers, getCurrentUser } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { restrictTo } from '../middlewares/rbac.middleware.js';

const router = Router();

router.use(protect);

router.get('/all', restrictTo('admin'), getAllUsers);
router.get('/me', getCurrentUser);

export default router;
