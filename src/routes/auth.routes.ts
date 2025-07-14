import { Router } from 'express';

import { login, register } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/user.validation';

const router = Router();

router.post('/register', validate(registerUserSchema), register);
router.post('/login', validate(loginUserSchema), login);

export default router;
