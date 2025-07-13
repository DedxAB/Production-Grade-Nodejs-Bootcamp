import { Request, Response } from 'express';

import { loginUser, registerUser } from '../services/auth.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json(user);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const token = await loginUser(req.body);
  res.json({ token });
});
