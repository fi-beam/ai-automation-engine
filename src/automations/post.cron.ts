import cron from 'node-cron';
import { generateDailyPost } from '../services/content.service';
import { postTweet } from '../services/twitter.service';
import { savePost } from '../db/database';
import { info, error } from '../core/logger';

// Jakarta timezone: UTC+7
// 9:00 AM Jakarta = 2:00 AM UTC
// 12:30 PM Jakarta = 5:30 AM UTC  
// 9:00 PM Jakarta = 2:00 PM UTC

async function executePostWorkflow(label: string): Promise<void> {
  try {
    info(`[${label}] Starting automated post workflow`);

    const content = await generateDailyPost();
    info(`[${label}] Content generated (${content.length} chars): ${content.substring(0, 50)}...`);

    const tweetId = await postTweet(content);
    
    if (tweetId) {
      info(`[${label}] Posted to Twitter: ${tweetId}`);
    } else {
      info(`[${label}] Twitter posting skipped (requires paid tier)`);
    }

    await savePost(content, tweetId);
    info(`[${label}] Post saved to database`);

    info(`[${label}] Workflow completed successfully`);
  } catch (err) {
    error(`[${label}] Workflow failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}

function scheduleJakartaPost(hourJakarta: number, minute: number, label: string): void {
  // Convert Jakarta time to UTC (Jakarta = UTC+7)
  const hourUTC = (hourJakarta - 7 + 24) % 24;
  const cronExpression = `${minute} ${hourUTC} * * *`;
  
  info(`Scheduled ${label}: Jakarta ${hourJakarta}:${minute.toString().padStart(2, '0')} (UTC ${hourUTC}:${minute.toString().padStart(2, '0')}) - "${cronExpression}"`);
  
  cron.schedule(cronExpression, () => executePostWorkflow(label));
}

export function startPostAutomation(): void {
  // 9:00 AM Jakarta - Morning post
  scheduleJakartaPost(9, 0, 'Morning Post');
  
  // 12:30 PM Jakarta - Afternoon post
  scheduleJakartaPost(12, 30, 'Afternoon Post');
  
  // 9:00 PM Jakarta - Evening post
  scheduleJakartaPost(21, 0, 'Evening Post');
  
  info('All Jakarta timezone posts scheduled successfully');
}
