import express from 'express';
import { PORT } from './core/config';
import { info } from './core/logger';
import { initializeDatabase } from './db/database';
import { startPostAutomation } from './automations/post.cron';
import { startEngagementAutomation } from './automations/engagement.cron';
import healthRoute from './routes/health.route';
import webhookRoute from './routes/webhook.route';

async function main(): Promise<void> {
  await initializeDatabase();
  
  startPostAutomation();
  startEngagementAutomation();

  const app = express();
  app.use(express.json());

  app.use(healthRoute);
  app.use(webhookRoute);

  app.listen(PORT, () => {
    info(`AI Automation Engine running on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
