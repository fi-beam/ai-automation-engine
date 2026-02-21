import { TwitterApi } from "twitter-api-v2";
import { env } from "../config/env";

const twitterClient = new TwitterApi({
  appKey: env.twitter.appKey,
  appSecret: env.twitter.appSecret,
  accessToken: env.twitter.accessToken,
  accessSecret: env.twitter.accessSecret,
});

export async function postTweet(text: string): Promise<string> {
  console.log(`[Twitter] Posting tweet (${text.length} chars)`);

  try {
    const tweet = await twitterClient.v2.tweet(text);

    if (!tweet?.data?.id) {
      throw new Error("Failed to post tweet: No tweet ID returned");
    }

    console.log(`[Twitter] Tweet posted successfully: https://x.com/i/web/status/${tweet.data.id}`);
    return tweet.data.id;
  } catch (error: any) {
    console.error("[Twitter] Error posting tweet:", error.message || error);

    if (error.code === 401) {
      throw new Error("Twitter authentication failed. Check your API credentials.");
    }
    if (error.code === 403) {
      throw new Error("Twitter permission denied. Ensure your app has write access.");
    }
    if (error.code === 429) {
      throw new Error("Twitter rate limit exceeded. Please wait before retrying.");
    }

    throw error;
  }
}

export async function verifyCredentials(): Promise<void> {
  try {
    const user = await twitterClient.v2.me();
    console.log(`[Twitter] Authenticated as @${user.data.username}`);
  } catch (error: any) {
    console.error("[Twitter] Failed to verify credentials:", error.message || error);
    throw new Error("Twitter authentication failed. Check your credentials.");
  }
}
