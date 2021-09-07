import joi from 'joi';

import joiValidator from '../../index';
import { getOneUserSchema } from './get-one-user';

const schema = joi
  .object({
    data: joi.array().required().items(getOneUserSchema),
    count: joi.number().min(0).required(),
  })
  .required()
  .unknown(true);

const getAllUsersSchema = joiValidator(schema);

export default getAllUsersSchema;
