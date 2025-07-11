import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';

import authRoutes from './routes/auth.routes.js';
import healthRoutes from './routes/health.routes.js';
import { logger } from './utils/logger.js';

dotenv.config();

export const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get('/', (_: Request, res: Response) => {
  res.send('🌟 BudgetBuddy API Running');
});
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);

app.use('*', (_, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});
