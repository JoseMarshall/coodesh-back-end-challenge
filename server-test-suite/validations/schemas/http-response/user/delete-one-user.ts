import joi from 'joi';

import joiValidator from '../../index';

const deleteUserSchema = joi
  .object({
    n: joi.number().required(),
    opTime: joi.object({
      ts: joi.string().required(),
      t: joi.number().required(),
    }),
    electionId: joi.string().required(),
    ok: joi.number().required(),
    $clusterTime: joi.object({
      clusterTime: joi.string().required(),
      signature: joi.object({
        hash: joi.string().required(),
        keyId: joi.string().required(),
      }),
    }),
    operationTime: joi.string().required(),
    deletedCount: joi.number().required(),
  })
  .required()
  .unknown(true);

export default joiValidator(deleteUserSchema);
