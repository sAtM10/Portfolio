import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import apiRouter from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  // Logger first so requests rejected by later middleware (e.g. bad JSON) are still logged.
  if (!env.isProduction) {
    app.use(morgan('dev'));
  }

  app.use(helmet());
  app.use(
    cors({
      origin: env.clientUrls,
      methods: ['GET', 'POST'],
    }),
  );
  app.use(express.json({ limit: '20kb' }));

  app.use('/api', apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
