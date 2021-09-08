import { Express, NextFunction, Request, Response, Router } from 'express';
import { readdir } from 'fs';
import path from 'path';
import { promisify } from 'util';

import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../constants';
import CustomError from '../../utils/custom-error';
import { makeMsgBody } from '../adapters/express-route-adapter';
import handleInvalidRoute from './handle-invalid-route';

export default async (app: Express): Promise<void> => {
  app.get('/', (_req: Request, res: Response) =>
    res.status(200).json({
      msg: 'REST Back-end Challenge 20201209 Running',
    })
  );

  /**
   * Load all routes from routes folder
   */
  const readdirAsync = promisify(readdir);
  const routes = await readdirAsync(path.resolve(__dirname, '../../routes'));
  await Promise.all(
    routes.map(r => [
      (async () => {
        if (!r.includes('__tests__')) {
          const router = (await import(`../../routes/${r}`)).default(Router());
          app.use(`/${r}`, router);
        }
      })(),
    ])
  );

  handleInvalidRoute(app);

  /**
   * Global error handler, handles all generic errors
   */
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) =>
    res.status(500).json(
      makeMsgBody(ApiMessages.InternalError, {
        error: new CustomError({
          statusCode: 500,
          name: ApiErrorsName.GenericName,
          type: ApiErrorsType.GenericType,
          message: ApiMessages.InternalError,
          stack: err.stack ?? '',
          details: { ...err },
        }),
      })
    )
  );
};
