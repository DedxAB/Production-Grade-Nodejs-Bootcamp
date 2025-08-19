import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import swaggerUi from 'swagger-ui-express';
import xssClean from 'xss-clean';

import { config } from './config/index.js';
import { globalErrorHandler } from './middlewares/globalError.middleware.js';
import apiRouter from './routes/api.routes.js';
import { AppError } from './utils/appError.js';
import { logger } from './utils/logger.js';
import { swaggerSpec } from './utils/swagger.js';

export const app = express();

app.use(cors());
app.use(helmet());
app.use(xssClean()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP param pollution
app.use(express.json({ limit: '100kb' }));
app.disable('x-powered-by');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(config.ROOT_API, limiter);

app.use(config.ROOT_API, apiRouter);

app.all('*', (req, _res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(globalErrorHandler);
