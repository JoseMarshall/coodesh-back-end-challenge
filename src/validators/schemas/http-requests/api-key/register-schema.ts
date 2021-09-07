import joi from 'joi';

import { HttpRequest } from '../../../../main/adapters/adapters.types';
import joiValidator from '../../../index';

const schema = joi
  .object({
    query: joi.object({}).unknown(false),
  })
  .required()
  .unknown(true);

export default joiValidator<HttpRequest>(schema);
