import { UserModel } from '../models/user.model.js';
import { AppError } from '../utils/appError.js';

export const getAllUsersService = async () => {
  const allUsers = await UserModel.find().select('-password -__v');
  return allUsers;
};

export const getCurrentUserService = async (userId: string) => {
  const user = await UserModel.findById(userId).select('-password -__v');
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};
