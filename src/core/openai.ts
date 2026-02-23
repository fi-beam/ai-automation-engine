import OpenAI from 'openai';
import { OPENAI_API_KEY } from './config';

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function generateText(prompt: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return response.choices[0]?.message?.content?.trim() || '';
}
