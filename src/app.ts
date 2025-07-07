import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

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

app.use('/api/health', healthRoutes);

app.use('*', (_, res) => {
  res.status(404).json({ message: 'Route not found' });
});
