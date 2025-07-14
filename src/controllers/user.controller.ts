import { Request, Response } from 'express';

import {
  getAllUsersService,
  getCurrentUserService,
} from '../services/user.service';
import { catchAsync } from '../utils/catchAsync';

export const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const allUsers = await getAllUsersService();
  res.status(200).json({
    status: 'success',
    data: allUsers,
  });
});

export const getCurrentUser = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const user = await getCurrentUserService(userId);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  }
);
