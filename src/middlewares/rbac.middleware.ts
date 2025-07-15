import { NextFunction, Request, Response } from 'express';

import { IUser } from '../models/user.model.js';
import { AppError } from '../utils/appError.js';

export function restrictTo(...roles: IUser['role'][]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    if (!user || !roles.includes(user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
}
