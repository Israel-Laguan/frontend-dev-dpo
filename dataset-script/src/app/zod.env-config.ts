import { z } from 'zod';
import { config } from 'dotenv';

config();

const envs = z.object({
  GEMINI_API_KEY: z.string(),
});

export const GEMINI_API_KEY = envs.parse(process.env).GEMINI_API_KEY;
