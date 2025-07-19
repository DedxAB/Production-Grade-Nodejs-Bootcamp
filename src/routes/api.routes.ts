import { Router } from 'express';

import authRoutes from './auth.routes.js';
import expenseRoutes from './expense.routes.js';
import healthRoutes from './health.routes.js';
import incomeRoutes from './income.routes.js';
import userRoutes from './user.routes.js';

const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
  res.send('🌟 BudgetBuddy API Running');
});

apiRouter.use('/health', healthRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/expenses', expenseRoutes);
apiRouter.use('/incomes', incomeRoutes);

export default apiRouter;
