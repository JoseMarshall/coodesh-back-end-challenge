import { Common, Status } from '../../src/constants';
import { TimeStamps } from '../enums';
import {
  MakeArraySchema,
  MakeGeneralResponseBodySchema,
  MakeHeaderParamSchema,
  MakeIntegerSchema,
  MakeObjectSchema,
  MakePathParamSchema,
  MakeQueryParamSchema,
  MakeRequestBodySchema,
  MakeResponseBodySchema,
  MakeStringSchema,
} from './builders-protocols';

export const makeStringSchema: MakeStringSchema = data => ({
  ...data,
  type: 'string',
});

export const makeArraySchema: MakeArraySchema = items => ({
  ...items,
  type: 'array',
});

export const makeObjectSchema: MakeObjectSchema = data => ({
  ...data,
  type: 'object',
});

export const makeIntegerSchema: MakeIntegerSchema = data => ({
  ...data,
  type: 'integer',
});

export const makeQueryParamSchema: MakeQueryParamSchema = data => ({
  ...data,
  allowReserved: true,
  in: 'query',
});

export const makePathParamSchema: MakePathParamSchema = data => ({
  ...data,
  in: 'path',
});

export const makeHeaderParamSchema: MakeHeaderParamSchema = data => ({
  ...data,
  in: 'header',
});

export const getSchemaRef = (x: string) => ({ $ref: `#/schemas/${x}` });

export const getEntitySchemaRef = (x: string) => ({
  $ref: `#/schemas/entities/${x}`,
});

export const getRequestBodySchemaRef = (x: string) => ({
  $ref: `#/schemas/requestBody/${x}`,
});

export const getResponseBodySchemaRef = (x: string) => ({
  $ref: `#/schemas/responseBody/${x}`,
});

export const getErrorSchemaRef = (x: string) => ({
  $ref: `#/schemas/errors/${x}`,
});

export const getSubSchemaRef = (x: string) => ({
  $ref: `#/schemas/subSchema/${x}`,
});

export const makeMsgBodySchema: MakeObjectSchema = payloadObjSchemaDefinition => ({
  type: 'object',
  required: ['msg', 'payload'],
  properties: {
    msg: makeStringSchema({
      description: 'The message comming from the server response',
      example: 'request done successfully',
    }),
    payload: makeObjectSchema(payloadObjSchemaDefinition),
  },
});

export const makeRequestBodySchema: MakeRequestBodySchema = (properties, required) => ({
  type: 'object',
  properties,
  required,
});

export const makeGetAllResponseBodySchema: MakeResponseBodySchema = (
  payloadProps,
  description,
  requiredFields = [],
  omitCount
) =>
  makeMsgBodySchema({
    required: ['data', ...(omitCount ? [] : ['count'])],
    properties: {
      data: makeArraySchema({
        description: 'The array of items that match the query',
        items: makeObjectSchema({
          required: [
            ...requiredFields,
            Common.ImportedT,
            Common.Status,
            Common.MongoId,
            TimeStamps.CreatedAt,
            TimeStamps.UpdatedAt,
          ],
          description: description ?? 'The signature of each item in this collection result',
          properties: {
            [Common.MongoId]: makeStringSchema({
              description: 'the unique identifier for this record in database',
            }),

            ...payloadProps,

            [Common.Status]: makeStringSchema({
              description: '',
              enum: Object.values(Status),
              example: Status.Draft,
            }),
            [Common.ImportedT]: makeStringSchema({
              description:
                'the date this record was imported from external api https://randomuser.me/api',
              format: 'date-time',
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
        }),
      }),
      ...(omitCount
        ? {}
        : {
            count: makeIntegerSchema({
              example: 1,
              description: 'the total count of this query result',
            }),
          }),
    },
  });

export const makeGeneralResponseBodySchema: MakeGeneralResponseBodySchema = (
  payloadProps,
  requiredFields: string[] = []
) =>
  makeMsgBodySchema({
    required: [
      ...requiredFields,
      Common.ImportedT,
      Common.Status,
      Common.MongoId,
      TimeStamps.CreatedAt,
      TimeStamps.UpdatedAt,
    ],
    properties: {
      [Common.MongoId]: makeStringSchema({
        description: 'the unique identifier for this record on database',
        example: '605d280bdf0eea37744e10c1',
      }),
      ...payloadProps,

      [Common.Status]: makeStringSchema({
        description: '',
        enum: Object.values(Status),
        example: Status.Draft,
      }),
      [Common.ImportedT]: makeStringSchema({
        description:
          'the date this record was imported from external api https://randomuser.me/api',
        format: 'date-time',
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

export const paginationParamsArray = [
  makeQueryParamSchema({
    name: 'page',
    type: 'integer',
    description: 'The pagination page starting from 1',
    required: true,
    example: '1',
  }),
  makeQueryParamSchema({
    name: 'limit',
    type: 'integer',
    description: 'The maximum of items per page in the pagination, it defaults to 15',
    required: false,
    example: '10',
  }),
];
