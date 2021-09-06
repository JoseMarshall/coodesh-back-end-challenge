import { ApiKey, ApiKeyUsage } from '../../../../src/constants';
import {
  makeArraySchema,
  makeIntegerSchema,
  makeMsgBodySchema,
  makeObjectSchema,
  makeStringSchema,
} from '../../../builders';
import { TimeStamps } from '../../../enums';

// eslint-disable-next-line import/prefer-default-export
export const registerApiKeyResponseBodySchema = makeMsgBodySchema({
  required: [
    ApiKey.Apikey,
    ApiKey.Host,
    ApiKey.Usage,
    ApiKey.MongoId,
    TimeStamps.CreatedAt,
    TimeStamps.UpdatedAt,
  ],
  properties: {
    [ApiKey.MongoId]: makeStringSchema({
      description: 'the unique identifier for this record in database',
    }),
    [ApiKey.Apikey]: makeStringSchema({
      description: 'The registered API KEY',
      example: 'h19pqkry8jylrnbtanrj9x166i9wi6',
    }),
    [ApiKey.Host]: makeStringSchema({
      description: 'The client hostname',
      example: 'localhost',
    }),
    [ApiKey.Usage]: makeArraySchema({
      minItems: 1,
      description: 'History of the API key usage',
      items: makeObjectSchema({
        required: [ApiKeyUsage.Count, ApiKeyUsage.Date],
        properties: {
          count: makeIntegerSchema({
            description: 'The number of times this API KEY was used on a specific date',
            example: 20,
          }),
          date: makeStringSchema({
            description: 'the date this API KEY was used',
            format: 'date-time',
          }),
        },
      }),
    }),
    [TimeStamps.CreatedAt]: makeStringSchema({
      description: 'the date this record was created on database',
      format: 'date-time',
    }),
    [TimeStamps.UpdatedAt]: makeStringSchema({
      description: 'the date this record was last updated on database',
      format: 'date-time',
    }),
  },
});
