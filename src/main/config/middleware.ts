import { Express } from 'express';

import { bodyParser, contentType, cors, logger } from '../middleware';

export default (app: Express): void => {
  if (process.env.NODE_ENV === 'development') app.use(logger);
  app.use(cors);
  app.use(bodyParser);
  app.use(contentType);
};
