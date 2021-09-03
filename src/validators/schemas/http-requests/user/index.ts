import { Dob, User } from '../../../../constants';
import { HttpRequest } from '../../../../main/adapters/adapters.types';
import { calcAge } from '../../../../utils';
import deleteOneUserSchemaValidator from './delete-one-user-schema';
import getAllUsersSchemaValidator from './get-all-users-schema';
import getOneUserSchemaValidator from './get-one-user-schema';
import updateUserSchemaValidator from './update-user-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeGetAllUsersValidator = () => async (req: HttpRequest) =>
  getAllUsersSchemaValidator(req.query);

export const makeGetOneUserValidator = () => async (req: HttpRequest) =>
  getOneUserSchemaValidator(req.params);

export const makeUpdateUserValidator = () => async (req: HttpRequest) => {
  if (User.Dob in req.body) {
    req.body[User.Dob] = {
      ...req.body[User.Dob],
      [Dob.Age]: calcAge(req.body[User.Dob][Dob.Date]),
    };
  }
  return updateUserSchemaValidator(req);
};
export const makeDeleteOneUserValidator = () => async (req: HttpRequest) =>
  deleteOneUserSchemaValidator(req.params);
