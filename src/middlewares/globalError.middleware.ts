import { ErrorRequestHandler } from 'express';

import { AppError } from '../utils/appError.js';
import { logger } from '../utils/logger.js';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  _next
) => {
  logger.error(`[${req.method}] ${req.originalUrl} → ${err.message}`);

  if (err instanceof AppError && err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    return;
  }

  logger.error('UNEXPECTED ERROR:', err);

  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};
