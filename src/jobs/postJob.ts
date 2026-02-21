import { generateTweet } from "../services/openai";
import { postTweet } from "../services/twitter";
import { TOPICS } from "../prompts/systemPrompt";

function getRandomTopic(): string {
  const index = Math.floor(Math.random() * TOPICS.length);
  return TOPICS[index];
}

export async function runPostJob(): Promise<void> {
  const startTime = new Date().toISOString();
  console.log(`[Job] Starting post job at ${startTime}`);

  try {
    const topic = getRandomTopic();
    console.log(`[Job] Selected topic: "${topic}"`);

    const tweet = await generateTweet(topic);
    console.log(`[Job] Generated tweet: "${tweet}"`);

    const tweetId = await postTweet(tweet);
    console.log(`[Job] Successfully posted tweet ID: ${tweetId}`);

  } catch (error) {
    console.error("[Job] Post job failed:", error);
    throw error;
  }
}
