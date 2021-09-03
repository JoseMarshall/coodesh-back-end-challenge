import joi from 'joi';

import { Name, User } from '../../../../constants';
import joiValidator from '../../../index';
import { GetAllUsers } from '../../../types/user';
import { getAllSchema } from '../sub-schemas';

const getAllUserSchema = joi
  .object(getAllSchema)
  .append({
    [`${User.Name}>${Name.Title}`]: joi.string().allow(''),
    [`${User.Name}>${Name.First}`]: joi.string().allow(''),
    [`${User.Name}>${Name.Last}`]: joi.string().allow(''),
  })
  .required()
  .unknown(false);

export default joiValidator<GetAllUsers>(getAllUserSchema);
