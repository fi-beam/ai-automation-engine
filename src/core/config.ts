import dotenv from 'dotenv';

dotenv.config();

export const PORT = parseInt(process.env.PORT || '3000', 10);
export const DATABASE_URL = process.env.DATABASE_URL;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Twitter credentials for browser automation
export const TWITTER_USERNAME = process.env.TWITTER_USERNAME;
export const TWITTER_PASSWORD = process.env.TWITTER_PASSWORD;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required');
}

if (!TWITTER_USERNAME || !TWITTER_PASSWORD) {
  throw new Error('TWITTER_USERNAME and TWITTER_PASSWORD are required for browser automation');
}
