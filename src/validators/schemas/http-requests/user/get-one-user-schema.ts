import joi from 'joi';

import joiValidator from '../../../index';
import { GetOneUser } from '../../../types/user';
import { idSchema } from '../sub-schemas';

const getOneUserSchema = joi.object(idSchema).required().unknown(false);

export default joiValidator<GetOneUser>(getOneUserSchema);
