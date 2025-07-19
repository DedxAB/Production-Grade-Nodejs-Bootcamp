import mongoose, { Schema, Document } from 'mongoose';

export interface IncomeDocument extends Document {
  user: mongoose.Types.ObjectId;
  source: string;
  amount: number;
  date: Date;
}

const incomeSchema = new Schema<IncomeDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export const IncomeModel = mongoose.model<IncomeDocument>(
  'Income',
  incomeSchema
);
