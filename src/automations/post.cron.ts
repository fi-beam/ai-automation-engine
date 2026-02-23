import cron from 'node-cron';
import { generateDailyPost } from '../services/content.service';
import { postTweet } from '../services/twitter.service';
import { savePost } from '../db/database';
import { info, error } from '../core/logger';

export function startPostAutomation(): void {
  cron.schedule('0 9 * * *', async () => {
    try {
      info('Starting daily post automation');

      const content = await generateDailyPost();
      info(`Generated content: ${content.substring(0, 50)}...`);

      const tweetId = await postTweet(content);
      info(`Posted tweet with ID: ${tweetId}`);

      await savePost(content, tweetId);
      info('Post saved to database');

      info('Daily post automation completed successfully');
    } catch (err) {
      error(`Post automation failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  });
}
