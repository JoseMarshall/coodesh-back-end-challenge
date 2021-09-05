import { ApiErrorsName, ApiErrorsType } from '../../src/constants/messages';
import { CustomErrorProps, customErrorSchema } from '../schemas/errors';

export const customError = (props: CustomErrorProps, oneOf?: unknown[]) => ({
  description: props.description,
  content: {
    'application/json': {
      schema: oneOf
        ? {
            oneOf: [...oneOf, customErrorSchema(props)],
          }
        : customErrorSchema(props),
    },
  },
});

export const joiValidationError = () => ({
  description: 'Schema Validation Error',
  content: {
    'application/json': {
      schema: customErrorSchema({
        description: 'Schema Validation Error',
        name: ApiErrorsName.NoMatchedSchema,
        type: ApiErrorsType.ValidationError,
        code: 422,
      }),
    },
  },
});
