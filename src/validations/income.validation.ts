import { z } from 'zod';

export const createIncomeSchema = z.object({
  source: z.string().min(3),
  amount: z.number().positive(),
  date: z.coerce.date().optional(),
});

export type CreateIncomeInput = z.infer<typeof createIncomeSchema>;
