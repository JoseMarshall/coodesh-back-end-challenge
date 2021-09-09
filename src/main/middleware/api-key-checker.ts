import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import {
  ApiErrorsName,
  ApiErrorsType,
  ApiKey,
  ApiKeyUsage,
  ApiMessages,
  Headers,
} from '../../constants';
import { addDays, safeParseInt } from '../../utils';
import CustomError from '../../utils/custom-error';
import { makeMsgBody } from '../adapters/express-route-adapter';
import uow from '../external/repositories/mongodb/unit-of-work';

// eslint-disable-next-line import/prefer-default-export
export const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
  const apiKeyRepo = (await uow()).makeApiKeyRepository();
  try {
    const account = await apiKeyRepo.get({
      [ApiKey.Host]: req.headers.host,
      [ApiKey.Apikey]: req.header(Headers.APIKEY),
    });
    const today = new Date();
    const usageIndex = account.usage.findIndex(
      day => day.date.toDateString() === today.toDateString()
    );

    if (usageIndex >= 0) {
      if (account.usage[usageIndex].count >= safeParseInt(process.env.MAX_API_KEY_USAGE ?? '30')) {
        return res.status(429).json(
          makeMsgBody(ApiMessages.MaxApiCallsExceeded, {
            error: new CustomError({
              statusCode: 429,
              name: ApiErrorsName.GenericName,
              type: ApiErrorsType.AuthorizationError,
              message: ApiMessages.MaxApiCallsExceeded,
              stack: '',
              details: {},
            }),
          })
        );
      }

      await apiKeyRepo.update(
        {
          [ApiKey.Host]: req.headers.host,
          [ApiKey.Apikey]: req.header(Headers.APIKEY),
          [`${ApiKey.Usage}.${ApiKeyUsage.Date}`]: {
            $gte: new Date(today.toISOString().split('T')[0]),
            $lt: addDays(today, 1),
          },
        },
        { $inc: { [`${ApiKey.Usage}.$.${ApiKeyUsage.Count}`]: 1 } }
      );
    } else {
      await apiKeyRepo.update(
        {
          [ApiKey.MongoId]: new ObjectId(account[ApiKey.MongoId]),
        },
        { $push: { [ApiKey.Usage]: { [ApiKeyUsage.Date]: today, [ApiKeyUsage.Count]: 1 } } }
      );
    }
    return next();
  } catch (e) {
    return res.status(403).json(
      makeMsgBody(ApiMessages.NotAllowed, {
        error:
          e instanceof CustomError
            ? e
            : new CustomError({
                statusCode: 403,
                name: ApiErrorsName.GenericName,
                type: ApiErrorsType.AuthorizationError,
                message: ApiMessages.NotAllowed,
                stack: '',
                details: {
                  msg: `Require a valid API Key using this endpoint: GET /api-key/register and send your subsequent resquest with the API Key in headers under ${Headers.APIKEY}`,
                },
              }),
      })
    );
  }
};
