import { Common } from '../../../src/constants';
import { ApiErrorsName, ApiErrorsType } from '../../../src/constants/messages';
import {
  getRequestBodySchemaRef,
  getResponseBodySchemaRef,
  makePathParamSchema,
} from '../../builders';
import { customError, joiValidationError } from '../../components';
import { ErrorDescription, SuccessDescription, Tags } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const updateUser = {
  put: {
    tags: [Tags.User],
    summary: 'end-point to update an user',
    parameters: [
      makePathParamSchema({
        name: Common.MongoId,
        type: 'string',
        description: 'The unique identifier of this user in database',
        example: 'f37226ad-f294-49b6-ac6d-5fd18995220a',
        required: true,
      }),
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: getRequestBodySchemaRef('updateUser'),
        },
      },
    },
    responses: {
      201: {
        description: SuccessDescription.UpdateOne,
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('updateUser'),
          },
        },
      },
      400: customError({
        description: ErrorDescription.BadRequest,
        name: ApiErrorsName.GenericName,
        type: ApiErrorsType.GenericType,
        code: 400,
      }),

      404: customError({
        description: ErrorDescription.NotFound,
        name: ApiErrorsName.ResourceNotFound,
        type: ApiErrorsType.GenericType,
        code: 404,
      }),
      422: joiValidationError(),
      500: customError({ description: ErrorDescription.InternalError }),
    },
  },
};
