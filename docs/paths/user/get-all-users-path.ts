import { Name, User } from '../../../src/constants';
import { ApiErrorsName, ApiErrorsType } from '../../../src/constants/messages';
import {
  getResponseBodySchemaRef,
  makeHeaderParamSchema,
  makeQueryParamSchema,
  paginationParamsArray,
} from '../../builders';
import { customError, joiValidationError } from '../../components';
import { ErrorDescription, SuccessDescription, Tags } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const getAllUsers = {
  get: {
    tags: [Tags.User],
    summary: 'end-point to fetch all users',
    parameters: [
      ...paginationParamsArray,
      makeHeaderParamSchema({
        name: 'x-api-key',
        type: 'string',
        description: 'The API KEY required to access this resource',
        example: 'p2wik7no2a4vephuaeou58iz20v41u',
        required: true,
      }),
      makeQueryParamSchema({
        name: `${User.Name}>${Name.Title}`,
        type: 'string',
        description:
          'Filter the user by its name (title). Obs.: Its NOT case sensitive, the result will be those users with title that contains the specified value',
        required: false,
        example: `Mr`,
      }),
      makeQueryParamSchema({
        name: `${User.Name}>${Name.First}`,
        type: 'string',
        description:
          'Filter the user by its name (first). Obs.: Its NOT case sensitive, the result will be those users with first name containing the specified value',
        required: false,
        example: `Julien`,
      }),
      makeQueryParamSchema({
        name: `${User.Name}>${Name.Last}`,
        type: 'string',
        description:
          'Filter the user by its name (last). Obs.: Its NOT case sensitive, the result will be those users with last name containing the specified value',
        required: false,
        example: `Garnier`,
      }),
    ],
    responses: {
      200: {
        description: SuccessDescription.GetAll,
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('getAllUsers'),
          },
        },
      },
      400: customError({
        description: ErrorDescription.BadRequest,
        name: ApiErrorsName.GenericName,
        type: ApiErrorsType.GenericType,
        code: 400,
      }),
      403: customError({
        description: ErrorDescription.NotAllowed,
        name: ApiErrorsName.GenericName,
        type: ApiErrorsType.AuthorizationError,
        code: 403,
      }),
      422: joiValidationError(),
      429: customError({
        description: 'Max Api Calls Exceeded',
        name: 'MaxApiCallsExceeded',
        type: ApiErrorsType.AuthorizationError,
        code: 429,
      }),
      500: customError({ description: ErrorDescription.InternalError }),
    },
  },
};
