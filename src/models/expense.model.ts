import mongoose, { Schema, Document } from 'mongoose';

export interface ExpenseDocument extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  amount: number;
  category:
    | 'food'
    | 'transport'
    | 'health'
    | 'entertainment'
    | 'utilities'
    | 'other';
  date: Date;
}

const expenseSchema = new Schema<ExpenseDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        'food',
        'transport',
        'health',
        'entertainment',
        'utilities',
        'other',
      ],
      default: 'other',
    },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const ExpenseModel = mongoose.model<ExpenseDocument>(
  'Expense',
  expenseSchema
);
