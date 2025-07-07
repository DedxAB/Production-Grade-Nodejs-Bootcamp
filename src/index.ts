import { app } from './app.js';
import { connectMongo } from './config/mongo.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 3000;

(async () => {
  await connectMongo();

  app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
  });
})();
