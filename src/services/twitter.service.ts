import axios from 'axios';
import { TWITTER_BEARER_TOKEN } from '../core/config';
import { error } from '../core/logger';

const TWITTER_API_URL = 'https://api.twitter.com/2/tweets';

export async function postTweet(text: string): Promise<string | null> {
  try {
    const response = await axios.post(
      TWITTER_API_URL,
      { text },
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data?.data?.id || null;
  } catch (err) {
    error(`Failed to post tweet: ${err instanceof Error ? err.message : String(err)}`);
    throw err;
  }
}
