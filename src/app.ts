import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { globalErrorHandler } from './middlewares/globalError.middleware.js';
import authRoutes from './routes/auth.routes.js';
import healthRoutes from './routes/health.routes.js';
import userRoutes from './routes/user.routes.js';
import { logger } from './utils/logger.js';
import { swaggerSpec } from './utils/swagger.js';

export const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get('/api', (_req: Request, res: Response) => {
  res.send('🌟 BudgetBuddy API Running');
});
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(globalErrorHandler);
