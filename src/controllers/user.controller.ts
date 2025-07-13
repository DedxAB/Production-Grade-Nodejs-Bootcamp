import { Request, Response } from 'express';

import { getAllUsersService } from '../services/user.service';
import { catchAsync } from '../utils/catchAsync';

export const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const allUsers = await getAllUsersService();
  res.status(200).json({
    status: 'success',
    data: allUsers,
  });
});
