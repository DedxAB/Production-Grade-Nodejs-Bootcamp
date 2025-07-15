import { app } from './app.js';
import { config } from './config/index.js';
import { connectMongo } from './config/mongo.js';
import { logger } from './utils/logger.js';

(async () => {
  await connectMongo();

  app.listen(config.PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${config.PORT}`);
  });
})();
