import { Router } from 'express';

import { login, register } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/user.validation.js';

const router = Router();

router.post('/register', validate(registerUserSchema), register);
router.post('/login', validate(loginUserSchema), login);

export default router;
