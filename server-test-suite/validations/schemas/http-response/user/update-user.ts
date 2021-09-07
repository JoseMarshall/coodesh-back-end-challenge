import joiValidator from '../../index';
import { getOneUserSchema } from './get-one-user';

export const updateUserSchema = getOneUserSchema;

export default joiValidator(updateUserSchema);
