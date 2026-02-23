import express from 'express';
import { PORT } from './core/config';
import { info } from './core/logger';
import healthRoute from './routes/health.route';

const app = express();

app.use(healthRoute);

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
