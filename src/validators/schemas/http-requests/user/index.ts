import { HttpRequest } from '../../../../main/adapters/adapters.types';
import getAllUsersSchemaValidator from './get-all-users-schema';
import getOneUserSchemaValidator from './get-one-user-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeGetAllUsersValidator = () => async (req: HttpRequest) =>
  getAllUsersSchemaValidator(req.query);

export const makeGetOneUserValidator = () => async (req: HttpRequest) =>
  getOneUserSchemaValidator(req.params);
