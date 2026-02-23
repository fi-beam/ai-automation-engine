import cron from 'node-cron';
import { updateEngagementMetrics } from '../services/analytics.service';
import { info, error } from '../core/logger';

export function startEngagementAutomation(): void {
  cron.schedule('0 */6 * * *', async () => {
    try {
      info('Starting engagement update automation');

      await updateEngagementMetrics();

      info('Engagement update completed');
    } catch (err) {
      error(`Engagement automation failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  });
}
