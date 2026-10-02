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

  // Behind a hosting proxy, this makes req.ip the real client IP for rate limiting.
  app.set('trust proxy', env.trustProxy);

  // Logger first so requests rejected by later middleware (e.g. bad JSON) are still logged.
  if (!env.isProduction) {
    app.use(morgan('dev'));
  }

  app.use(helmet());
  app.use(
    cors({
      origin: env.clientUrls,
      methods: ['GET', 'POST'],
      maxAge: 600, // let browsers cache preflight responses for 10 minutes
    }),
  );
  app.use(express.json({ limit: '20kb' }));

  app.use('/api', apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
