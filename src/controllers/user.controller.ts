import { Request, Response } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
} from '../services/user.service.js';
    
export const createUserHandler = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await createUser(name, email);
  res.status(201).json(user);
};

export const getAllUsersHandler = async (_: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};
