import cron from 'node-cron';
import { generateDailyPost } from '../services/content.service';
import { postTweet } from '../services/twitter.service';
import { savePost } from '../db/database';
import { info, error } from '../core/logger';

// Jakarta timezone: UTC+7
// 9:00 AM Jakarta = 2:00 AM UTC
// 12:30 PM Jakarta = 5:30 AM UTC  
// 9:00 PM Jakarta = 2:00 PM UTC

function scheduleJakartaPost(hourJakarta: number, minute: number, label: string): void {
  // Convert Jakarta time to UTC
  const hourUTC = (hourJakarta - 7 + 24) % 24;
  const cronExpression = `${minute} ${hourUTC} * * *`;
  
  info(`Scheduled ${label} post: Jakarta ${hourJakarta}:${minute.toString().padStart(2, '0')} (UTC ${hourUTC}:${minute.toString().padStart(2, '0')})`);
  
  cron.schedule(cronExpression, async () => {
    try {
      info(`Starting ${label} post automation (Jakarta ${hourJakarta}:${minute.toString().padStart(2, '0')})`);

      const content = await generateDailyPost();
      info(`Generated content (${content.length} chars): ${content.substring(0, 50)}...`);

      const tweetId = await postTweet(content);
      info(`Posted tweet ID: ${tweetId}`);

      await savePost(content, tweetId);
      info('Post saved to database');

      info(`${label} post automation completed successfully`);
    } catch (err) {
      error(`Post automation failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  });
}

export function startPostAutomation(): void {
  // 9:00 AM Jakarta
  scheduleJakartaPost(9, 0, 'Morning (9:00)');
  
  // 12:30 PM Jakarta
  scheduleJakartaPost(12, 30, 'Afternoon (12:30)');
  
  // 9:00 PM Jakarta
  scheduleJakartaPost(21, 0, 'Evening (21:00)');
}
