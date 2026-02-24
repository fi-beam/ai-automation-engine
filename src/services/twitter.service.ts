import { TwitterApi } from 'twitter-api-v2';
import { error, info } from '../core/logger';

const apiKey = process.env.TWITTER_API_KEY;
const apiSecret = process.env.TWITTER_API_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessSecret = process.env.TWITTER_ACCESS_SECRET;

if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
  error('Missing Twitter OAuth 1.0a credentials');
}

const client = new TwitterApi({
  appKey: apiKey!,
  appSecret: apiSecret!,
  accessToken: accessToken!,
  accessSecret: accessSecret!,
});

export async function postTweet(text: string): Promise<string | null> {
  try {
    info(`Posting tweet with OAuth 1.0a for user`);
    const tweet = await client.v2.tweet(text);
    info(`Tweet posted: ${tweet.data.id}`);
    return tweet.data.id;
  } catch (err: any) {
    error(`Twitter API error: ${err.message}`);
    if (err.code === 403) {
      error('403 Forbidden: Check app permissions (need Write access) and token validity');
    }
    throw err;
  }
}
