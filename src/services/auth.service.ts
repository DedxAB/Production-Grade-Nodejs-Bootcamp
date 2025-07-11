import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';

import { UserModel } from '../models/user.model';

type RegisterUserParams = {
  name: string;
  email: string;
  password: string;
};

type LoginUserParams = {
  email: string;
  password: string;
};

export async function registerUser({
  name,
  email,
  password,
}: RegisterUserParams) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });
  return { id: user._id, name: user.name, email: user.email };
}

export async function loginUser({ email, password }: LoginUserParams) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Invalid credentials');
  }

  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiry = process.env.JWT_EXPIRES_IN;

  if (!jwtSecret || !jwtExpiry) {
    throw new Error('JWT_SECRET or JWT_EXPIRES_IN not defined');
  }

  const signOptions: SignOptions = {
    expiresIn: jwtExpiry as SignOptions['expiresIn'],
  };

  const token = jwt.sign({ id: user._id }, jwtSecret, signOptions);
  return token;
}
