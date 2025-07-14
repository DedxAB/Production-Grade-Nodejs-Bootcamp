import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodType } from 'zod';

import { AppError } from '../utils/appError.js';

export function validate<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const messages = err.issues.map((e) => e.message);
        const message =
          messages.length > 0 ? messages.join('; ') : 'Invalid request data';
        next(new AppError(message, 400));
      } else {
        next(err);
      }
    }
  };
}
