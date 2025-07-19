import { Request, Response } from 'express';

import {
  createExpenseService,
  getMyExpensesService,
} from '../services/expense.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createExpense = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const expense = await createExpenseService( userId, req.body );
  res.status(201).json({ expense });
});

export const getMyExpenses = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const expenses = await getMyExpensesService(userId);
  res.status(200).json({ expenses });
});
