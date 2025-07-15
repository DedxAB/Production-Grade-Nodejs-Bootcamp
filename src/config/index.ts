import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().regex(/^\d+$/).transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  MONGO_URI: z.url(),
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string(),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error(
    '❌ Invalid or missing environment variables:',
    envParsed.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const config = envParsed.data;
