import { Name, User } from '../../../src/constants';
import { ApiErrorsName, ApiErrorsType } from '../../../src/constants/messages';
import {
  getResponseBodySchemaRef,
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
      422: joiValidationError(),
      500: customError({ description: ErrorDescription.InternalError }),
    },
  },
};
