import dotenv from 'dotenv';

dotenv.config();

export const PORT = parseInt(process.env.PORT || '3000', 10);

export const DATABASE_URL = process.env.DATABASE_URL;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required');
}

if (!TWITTER_BEARER_TOKEN) {
  throw new Error('TWITTER_BEARER_TOKEN is required');
}
