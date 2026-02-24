import { error, info } from '../core/logger';

export async function postTweet(text: string): Promise<string | null> {
  info(`[MOCK] Would post tweet: ${text.substring(0, 50)}...`);
  
  // Twitter Basic tier requires $100/month payment
  // Free tier can only read, not post
  error('Twitter posting disabled - requires Basic tier ($100/month)');
  
  // Return mock ID for testing
  return 'mock-tweet-id-' + Date.now();
}
