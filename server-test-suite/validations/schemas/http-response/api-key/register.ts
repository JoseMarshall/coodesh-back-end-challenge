import joi from 'joi';

import { ApiKey, TimeStamps } from '../../../../../src/constants';
import joiValidator from '../../index';

const apiKeySchema = joi
  .object({
    [ApiKey.Apikey]: joi.string().required().min(30),
    [ApiKey.Host]: joi.string().required(),
    [ApiKey.Usage]: joi
      .array()
      .items(
        joi.object({ date: joi.date().required(), count: joi.number().required() }).unknown(false)
      )
      .min(1)
      .required(),
    [TimeStamps.CreatedAt]: joi.date().required(),
    [TimeStamps.UpdatedAt]: joi.date().required(),
  })
  .required()
  .unknown(true);

export default joiValidator(apiKeySchema);
