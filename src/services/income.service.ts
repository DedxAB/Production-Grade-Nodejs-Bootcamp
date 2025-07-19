import { IncomeModel } from '../models/income.model.js';
import { CreateIncomeInput } from '../validations/income.validation.js';

export const createIncomeService = async (
  userId: string,
  data: CreateIncomeInput
) => {
  const income = await IncomeModel.create({ ...data, user: userId });
  return income;
};

export const getMyIncomesService = async (userId: string) => {
  const incomes = await IncomeModel.find({ user: userId });
  return incomes;
};
