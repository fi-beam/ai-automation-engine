import express from 'express';
import { PORT } from './core/config.js';
import { info } from './core/logger.js';
import healthRoute from './routes/health.route.js';

const app = express();

app.use(healthRoute);

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
