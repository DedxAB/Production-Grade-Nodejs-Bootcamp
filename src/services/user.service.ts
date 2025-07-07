import { UserModel } from "../models/user.model.js";

export const createUser = async (name: string, email: string) => {
  return await UserModel.create({ name, email });
};

export const getAllUsers = async () => {
  return await UserModel.find();
};

export const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};
