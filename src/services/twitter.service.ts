import { TwitterApi } from 'twitter-api-v2';
import { TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET } from '../core/config';
import { error } from '../core/logger';

const client = new TwitterApi({
  appKey: TWITTER_API_KEY!,
  appSecret: TWITTER_API_SECRET!,
  accessToken: TWITTER_ACCESS_TOKEN!,
  accessSecret: TWITTER_ACCESS_SECRET!,
});

export async function postTweet(text: string): Promise<string | null> {
  try {
    const tweet = await client.v2.tweet(text);
    return tweet.data.id;
  } catch (err) {
    error(`Failed to post tweet: ${err instanceof Error ? err.message : String(err)}`);
    throw err;
  }
}
