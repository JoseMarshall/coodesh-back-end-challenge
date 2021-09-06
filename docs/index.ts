import { Tags } from './enums';
import { registerNewApiKey } from './paths/api-key';
import { getDefaultRoute } from './paths/generic';
import { deleteUser, getAllUsers, getOneUser, updateUser } from './paths/user';
import { updateUserRequestBodySchema } from './schemas/request-body';
import {
  deleteOneUserResponseBodySchema,
  genericResponseBodySchema,
  getAllUsersResponseBodySchema,
  getOneUserResponseBodySchema,
  registerApiKeyResponseBodySchema,
  updateUserResponseBodySchema,
} from './schemas/response-body';

export default {
  openapi: '3.0.1',
  info: {
    title: 'Back-end Challenge 2021',
    description: 'CRUD Users, last updated at 2021-09-08 08:10 by JoseM@rshall PD',
    version: '1.0.0',
  },
  servers: [{ url: '/' }],
  tags: [
    {
      name: Tags.Generic,
    },
    {
      name: Tags.User,
      description: 'All endpoints regarding to User entity',
    },
  ],

  paths: {
    '/': getDefaultRoute,
    '/api-key/register': registerNewApiKey,
    '/users': getAllUsers,
    '/users/{_id}': { ...getOneUser, ...updateUser, ...deleteUser },
  },

  schemas: {
    requestBody: {
      updateUser: updateUserRequestBodySchema,
    },
    responseBody: {
      getOneUser: getOneUserResponseBodySchema,
      getAllUsers: getAllUsersResponseBodySchema,
      updateUser: updateUserResponseBodySchema,
      deleteUser: deleteOneUserResponseBodySchema,
      getDefaultRoute: genericResponseBodySchema,
      registerNewApiKey: registerApiKeyResponseBodySchema,
    },
  },
};
