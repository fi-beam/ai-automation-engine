import OpenAI from "openai";
import { env } from "../config/env";
import { SYSTEM_PROMPT } from "../prompts/systemPrompt";

const openai = new OpenAI({
  apiKey: env.openai.apiKey,
});

export async function generateTweet(topic: string): Promise<string> {
  console.log(`[OpenAI] Generating tweet for topic: "${topic}"`);

  try {
    const response = await openai.chat.completions.create({
      model: env.openai.model,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Write a tweet about: ${topic}. Remember: max 280 chars, no emojis, strong hook, my signature style.`,
        },
      ],
      temperature: 0.9,
      max_tokens: 100,
    });

    const tweet = response.choices[0]?.message?.content?.trim();

    if (!tweet) {
      throw new Error("Empty response from OpenAI");
    }

    console.log(`[OpenAI] Generated tweet (${tweet.length} chars)`);
    return tweet;
  } catch (error) {
    console.error("[OpenAI] Error generating tweet:", error);
    throw error;
  }
}
