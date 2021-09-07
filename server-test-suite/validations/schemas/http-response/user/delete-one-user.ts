import joi from 'joi';

import joiValidator from '../../index';

const deleteUserSchema = joi
  .object({
    n: joi.number().required(),
    opTime: joi.object({
      ts: joi.string().required(),
      t: joi.number().required(),
    }),
    electionId: joi.string(),
    ok: joi.number().valid(1).required(),
    $clusterTime: joi.object({
      clusterTime: joi.string().required(),
      signature: joi.object({
        hash: joi.string().required(),
        keyId: joi.string().required(),
      }),
    }),
    operationTime: joi.string(),
    deletedCount: joi.number().min(1).required(),
  })
  .required()
  .unknown(true);

export default joiValidator(deleteUserSchema);
