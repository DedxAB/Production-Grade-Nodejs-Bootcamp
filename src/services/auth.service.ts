import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';

import { UserModel } from '../models/user.model.js';
import { AppError } from '../utils/appError.js';
import {
  LoginUserInput,
  RegisterUserInput,
} from '../validations/user.validation.js';

export async function registerUser({
  name,
  email,
  password,
}: RegisterUserInput) {
  const existing = await UserModel.findOne({ email });
  if (existing) {
    throw new AppError('User already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role: 'user', // Default role is 'user'
  });
  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

export async function loginUser({ email, password }: LoginUserInput) {
  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError('Invalid credentials', 401);
  }

  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiry = process.env.JWT_EXPIRES_IN;

  if (!jwtSecret || !jwtExpiry) {
    throw new AppError('JWT_SECRET or JWT_EXPIRES_IN not defined');
  }

  const signOptions: SignOptions = {
    expiresIn: jwtExpiry as SignOptions['expiresIn'],
  };

  const token = jwt.sign(
    { id: user._id, role: user.role },
    jwtSecret,
    signOptions
  );
  return token;
}
