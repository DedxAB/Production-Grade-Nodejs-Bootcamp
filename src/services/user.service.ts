import { UserModel } from '../models/user.model.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import { AppError } from '../utils/appError.js';

export const getAllUsersService = async (queryOptions: any) => {
  const features = new APIFeatures(UserModel.find(), queryOptions)
    .search('name', 'email')
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const allUsers = await features.query.select('-password -__v');
  return allUsers;
};

export const getCurrentUserService = async (userId: string) => {
  const user = await UserModel.findById(userId).select('-password -__v');
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};
