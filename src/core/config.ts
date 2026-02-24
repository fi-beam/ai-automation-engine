import dotenv from 'dotenv';

dotenv.config();

export const PORT = parseInt(process.env.PORT || '3000', 10);

export const DATABASE_URL = process.env.DATABASE_URL;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
export const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;
export const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
export const TWITTER_ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required');
}

if (!TWITTER_API_KEY || !TWITTER_API_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_SECRET) {
  throw new Error('Twitter OAuth 1.0a credentials required: TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET');
}
