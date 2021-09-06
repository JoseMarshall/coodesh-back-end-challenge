import { getResponseBodySchemaRef } from '../../builders';
import { customError } from '../../components';
import { ErrorDescription, Tags } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const registerNewApiKey = {
  get: {
    tags: [Tags.ApiKey],
    summary: 'end-point to register to a new API KEY',
    responses: {
      201: {
        description: '',
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('registerNewApiKey'),
          },
        },
      },
      500: customError({ description: ErrorDescription.InternalError }),
    },
  },
};
