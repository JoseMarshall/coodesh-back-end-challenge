import joi from 'joi';

import joiValidator from '../../index';

export const CustomErrorSchema = joi
  .object({
    details: joi.object().required(),
    message: joi.string().required().allow(''),
    name: joi.string().required(),
    type: joi.string().required(),
    stack: joi.string().required().allow(''),
    statusCode: joi.number().required().min(100).max(511),
  })
  .required()
  .unknown(true);

export const MsgBodyErrorSchema = joi
  .object({
    msg: joi.string().required().allow(''),
    payload: joi.object({ error: CustomErrorSchema }).required(),
  })
  .required()
  .unknown(true);

export const MsgBodyErrorValidator = joiValidator(MsgBodyErrorSchema);

export default joiValidator(CustomErrorSchema);
