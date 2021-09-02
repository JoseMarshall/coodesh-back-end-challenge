import joi from 'joi';

import joiValidator from '../../../index';
import { GetAllUsers } from '../../../types/user';
import { getAllSchema } from '../sub-schemas';

const getAllUserSchema = joi.object(getAllSchema).required().unknown(false);

export default joiValidator<GetAllUsers>(getAllUserSchema);
