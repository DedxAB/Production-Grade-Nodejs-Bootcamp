import { Router } from 'express';

import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
} from '../validations/user.validation.js';

const router = Router();

router.post('/register', validate(registerUserSchema), register);
router.post('/login', validate(loginUserSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post(
  '/reset-password/:token',
  validate(resetPasswordSchema),
  resetPassword
);

export default router;
