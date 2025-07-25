import mongoose from 'mongoose';

import { logger } from '../utils/logger.js';
import { config } from './index.js';

export const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    logger.info(`📦 MongoDB Connected: ${conn.connection.host}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error('❌ MongoDB connection failed', err.message);
    } else {
      logger.error('❌ MongoDB connection failed', String(err));
    }
    process.exit(1);
  }
};
