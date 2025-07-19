import { Request, Response } from 'express';

import {
  createIncomeService,
  getMyIncomesService,
} from '../services/income.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createIncome = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const income = await createIncomeService(userId, req.body);
  res.status(201).json({ income });
});

export const getMyIncomes = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const incomes = await getMyIncomesService(userId);
  res.status(200).json({ incomes });
});
