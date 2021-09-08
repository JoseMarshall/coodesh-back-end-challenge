import { Express, NextFunction, Request, Response, Router } from 'express';
import { readdirSync } from 'fs';
import path from 'path';

import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../constants';
import CustomError from '../../utils/custom-error';
import { makeMsgBody } from '../adapters/express-route-adapter';
import handleInvalidRoute from './handle-invalid-route';

export default (app: Express): void => {
  app.get('/', (_req: Request, res: Response) =>
    res.status(200).json({
      msg: 'REST Back-end Challenge 20201209 Running',
    })
  );

  /**
   * Load all routes from routes folder
   */

  readdirSync(path.resolve(__dirname, '../../routes')).map(async file => {
    if (!file.includes('__tests__')) {
      const router = (await import(`../../routes/${file}`)).default(Router());
      app.use(`/${file}`, router);
    }
  });

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
