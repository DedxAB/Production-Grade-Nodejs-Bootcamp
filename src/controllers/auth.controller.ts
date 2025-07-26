import { Request, Response } from 'express';

import {
  forgotPasswordService,
  loginUser,
  registerUser,
  resetPasswordService,
} from '../services/auth.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json(user);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const token = await loginUser(req.body);
  res.status(200).json({
    status: 'success',
    token,
  });
});

export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const resetURL = await forgotPasswordService(req.body.email);

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
      resetURL,
    });
  }
);

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  await resetPasswordService(token, newPassword);
  res.status(200).json({
    status: 'success',
    message: 'Password reset successful!',
  });
});
