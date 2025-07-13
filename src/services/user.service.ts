import { UserModel } from '../models/user.model';

export const getAllUsersService = async () => {
  const allUsers = await UserModel.find().select('-password -__v');
  return allUsers;
};
