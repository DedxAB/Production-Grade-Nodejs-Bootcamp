import { Router } from 'express';

import {
  createExpense,
  getMyExpenses,
} from '../controllers/expense.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createExpenseSchema } from '../validations/expense.validation.js';

const router = Router();

router.use(protect);

router.post('/', validate(createExpenseSchema), createExpense);
router.get('/my-expenses', getMyExpenses);

export default router;
