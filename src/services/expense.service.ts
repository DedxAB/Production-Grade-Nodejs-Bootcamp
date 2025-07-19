import { ExpenseModel } from '../models/expense.model.js';
import { CreateExpenseInput } from '../validations/expense.validation.js';

export const createExpenseService = async (
  userId: string,
  data: CreateExpenseInput
) => {
  const expense = await ExpenseModel.create({ user: userId, ...data });
  return expense;
};

export const getMyExpensesService = async (userId: string) => {
  const expenses = await ExpenseModel.find({ user: userId }).populate('user');
  return expenses;
};
