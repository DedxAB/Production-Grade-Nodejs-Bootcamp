import { z } from 'zod';

export const createExpenseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  amount: z.number().positive('Amount must be positive'),
  category: z
    .enum([
      'food',
      'transport',
      'health',
      'entertainment',
      'utilities',
      'other',
    ])
    .optional(), // Optional since model has default: 'other'
  date: z.coerce.date().optional(), // Optional since model has default: Date.now
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
