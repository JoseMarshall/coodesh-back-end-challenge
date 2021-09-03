import joi from 'joi';

import joiValidator from '../../../index';
import { DeleteOneUser } from '../../../types/user';
import { idSchema } from '../sub-schemas';

const deleteOneUserSchema = joi.object(idSchema).required().unknown(false);

export default joiValidator<DeleteOneUser>(deleteOneUserSchema);
