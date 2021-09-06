import { Common } from '../../../src/constants';
import { ApiErrorsName, ApiErrorsType } from '../../../src/constants/messages';
import {
  getResponseBodySchemaRef,
  makeHeaderParamSchema,
  makePathParamSchema,
} from '../../builders';
import { customError, joiValidationError } from '../../components';
import { ErrorDescription, SuccessDescription, Tags } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const getOneUser = {
  get: {
    tags: [Tags.User],
    summary: 'end-point to fetch an user',
    parameters: [
      makeHeaderParamSchema({
        name: 'x-api-key',
        type: 'string',
        description: 'The API KEY required to access this resource',
        example: 'p2wik7no2a4vephuaeou58iz20v41u',
        required: true,
      }),
      makePathParamSchema({
        name: Common.MongoId,
        type: 'string',
        description: 'The unique identifier of this user in database',
        example: 'f37226ad-f294-49b6-ac6d-5fd18995220a',
        required: true,
      }),
    ],
    responses: {
      200: {
        description: SuccessDescription.GetOne,
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('getOneUser'),
          },
        },
      },
      403: customError({
        description: ErrorDescription.NotAllowed,
        name: ApiErrorsName.GenericName,
        type: ApiErrorsType.AuthorizationError,
        code: 403,
      }),
      404: customError({
        description: ErrorDescription.NotFound,
        name: ApiErrorsName.GenericName,
        type: ApiErrorsType.GenericType,
        code: 404,
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
