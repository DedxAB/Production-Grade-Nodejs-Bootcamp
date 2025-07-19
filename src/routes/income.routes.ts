import { Router } from 'express';

import {
  createIncome,
  getMyIncomes,
} from '../controllers/income.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protect);

router.post('/', createIncome);
router.get('/my-incomes', getMyIncomes);

export default router;
