import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config/index.js';
import { IUser, UserModel } from '../models/user.model.js';
import { AppError } from '../utils/appError.js';
import { logger } from '../utils/logger.js';

export async function protect(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in', 401));
    }

    const decoded = jwt.verify(token, config.JWT_SECRET!) as {
      id: string;
    };

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    logger.error(`Auth Middleware Error: ${err}`);
    next(new AppError('Invalid or expired token', 401));
  }
}

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
