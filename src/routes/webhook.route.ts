import { Router, Request, Response } from 'express';
import { generateDailyPost } from '../services/content.service';
import { postTweet } from '../services/twitter.service';
import { savePost } from '../db/database';
import { info, error } from '../core/logger';

const router = Router();

router.post('/webhook/post', async (_req: Request, res: Response) => {
  try {
    info('Webhook triggered: manual post');

    const content = await generateDailyPost();
    const tweetId = await postTweet(content);
    await savePost(content, tweetId);

    info('Webhook post completed successfully');

    res.json({
      success: true,
      content,
      tweetId,
    });
  } catch (err) {
    error(`Webhook post failed: ${err instanceof Error ? err.message : String(err)}`);
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
});

export default router;
