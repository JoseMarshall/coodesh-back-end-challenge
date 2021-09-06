import { getResponseBodySchemaRef } from '../../builders';
import { customError } from '../../components';
import { ErrorDescription, Tags } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const getDefaultRoute = {
  get: {
    tags: [Tags.Generic],
    summary: 'end-point to get a welcome message from api server',
    responses: {
      200: {
        description: '',
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('getDefaultRoute'),
          },
        },
      },
      500: customError({ description: ErrorDescription.InternalError }),
    },
  },
};
