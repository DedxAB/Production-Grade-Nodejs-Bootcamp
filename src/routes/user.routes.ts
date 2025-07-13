import { Router } from 'express';

import { getAllUsers } from '../controllers/user.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', protect, restrictTo('admin'), getAllUsers);
// router.get('/me');

export default router;
