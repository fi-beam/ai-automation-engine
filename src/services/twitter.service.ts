import { TwitterApi } from 'twitter-api-v2';
import { error } from '../core/logger';

// Try OAuth 1.0a first (for bots)
const oauth1Client = process.env.TWITTER_ACCESS_TOKEN
  ? new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    })
  : null;

// OAuth 2.0 Bearer token (read-only mostly)
const bearerClient = process.env.TWITTER_BEARER_TOKEN
  ? new TwitterApi(process.env.TWITTER_BEARER_TOKEN)
  : null;

export async function postTweet(text: string): Promise<string | null> {
  try {
    if (!oauth1Client) {
      throw new Error('TWITTER_ACCESS_TOKEN and TWITTER_ACCESS_SECRET required to post tweets. Get them from Twitter Developer Portal > Keys and Tokens > Generate');
    }
    
    const tweet = await oauth1Client.v2.tweet(text);
    return tweet.data.id;
  } catch (err) {
    error(`Failed to post tweet: ${err instanceof Error ? err.message : String(err)}`);
    throw err;
  }
}
