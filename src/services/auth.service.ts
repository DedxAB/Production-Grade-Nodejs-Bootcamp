import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'node:crypto';

import { config } from '../config/index.js';
import { UserModel } from '../models/user.model.js';
import { AppError } from '../utils/appError.js';
import {
  ForgotPasswordInput,
  LoginUserInput,
  RegisterUserInput,
  ResetPasswordInput,
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

  const user = await UserModel.create({
    name,
    email,
    password,
  });
  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

export async function loginUser({ email, password }: LoginUserInput) {
  const user = await UserModel.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  const jwtSecret = config.JWT_SECRET;
  const jwtExpiry = config.JWT_EXPIRES_IN;

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

export const forgotPasswordService = async (
  email: ForgotPasswordInput['email']
) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new AppError('No user with that email.', 404);

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${config.ROOT_API}/reset-password/${resetToken}`;
  return resetURL;
};

export const resetPasswordService = async (
  token: string,
  newPassword: ResetPasswordInput['newPassword']
) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await UserModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });
  if (!user) throw new AppError('Invalid or expired token', 400);

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
};
