import { generateText } from '../core/openai';

export async function generateDailyPost(): Promise<string> {
  const systemPrompt = `You are a high-performing personal brand strategist on X.
Write concise, sharp, engaging content.
Maximum 280 characters.
No emojis.
No hashtags.`;

  const userPrompt = 'Write one post about discipline and long-term dominance.';

  const prompt = `System:
${systemPrompt}

User:
${userPrompt}`;

  return generateText(prompt);
}
