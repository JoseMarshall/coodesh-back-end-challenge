import { config } from 'dotenv';
import path from 'path';

import { logger } from '../utils/logger';
import { MongoHelper } from './external/repositories/mongodb/helpers/mongo-helper';

const start = async () => {
  try {
    config({
      path: path.resolve(
        process.cwd(),
        `.env.${process.env.TS_NODE_DEV ? 'development' : 'production'}`
      ),
    });

    await MongoHelper.connect();

    const { default: App } = await import('./config/app');

    const handleInvalidRoute = (await import('./config/handle-invalid-route')).default;

    handleInvalidRoute(App);
    const port = process.env.PORT ?? 3333;
    App.listen(port, () =>
      logger.info(`Server running at ${process.env.URL_ROOT ?? 'http://localhost'}:${port}`)
    );
  } catch (error) {
    logger.error(error);
  }
};

start().then();

process.on('uncaughtException', err => {
  logger.error(`${new Date().toUTCString()} uncaughtException:`, err.message);
  logger.error(err.stack ?? '');
  process.exit(1);
});
