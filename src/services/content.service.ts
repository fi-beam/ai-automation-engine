import { generateText } from '../core/openai';

const SYSTEM_PROMPT = `You are a high-performing personal brand strategist on X.
Write sharp, concise, high-IQ posts.
Maximum 280 characters.
No emojis.
No hashtags.`;

export async function generateDailyPost(): Promise<string> {
  const userPrompt = 'Write one post about discipline, long-term dominance, or system thinking.';
  
  const prompt = `${SYSTEM_PROMPT}

Topic: ${userPrompt}`;

  return generateText(prompt);
}
