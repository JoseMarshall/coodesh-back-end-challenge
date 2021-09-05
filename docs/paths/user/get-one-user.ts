import { Common } from '../../../src/constants';
import { ApiErrorsName, ApiErrorsType } from '../../../src/constants/messages';
import { getResponseBodySchemaRef, makePathParamSchema } from '../../builders';
import { customError, joiValidationError } from '../../components';
import { ErrorDescription, SuccessDescription, Tags } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const getOneUser = {
  get: {
    tags: [Tags.User],
    summary: 'end-point to fetch one user',
    parameters: [
      makePathParamSchema({
        name: Common.MongoId,
        type: 'string',
        description: 'The unique identifier of this user in database',
        example: '605d280bdf0eea37744e10c1',
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
      404: customError({
        description: ErrorDescription.NotFound,
        name: ApiErrorsName.GenericName,
        type: ApiErrorsType.GenericType,
        code: 404,
      }),
      422: joiValidationError(),
      500: customError({ description: ErrorDescription.InternalError }),
    },
  },
};
