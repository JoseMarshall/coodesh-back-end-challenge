import { makeIntegerSchema, makeObjectSchema, makeStringSchema } from '../../builders';

export interface CustomErrorProps {
  description: string;
  name?: string;
  type?: string;
  code?: number;
  details?: Record<string, unknown>;
}
export const customErrorSchema = (props: CustomErrorProps) => ({
  type: 'object',
  required: ['msg', 'payload'],
  properties: {
    msg: makeStringSchema({
      description: 'the error message coming from the server',
      example: 'Something went wrong',
    }),
    payload: makeObjectSchema({
      required: ['error'],
      properties: {
        error: makeObjectSchema({
          required: ['name', 'message', 'stack', 'type', 'statusCode', 'details'],
          properties: {
            name: makeStringSchema({
              description: 'The name of this error',
              example: props.name ?? 'ERROR',
            }),
            type: makeStringSchema({
              description: 'The type of this error',
              example: props.type ?? 'INTERNAL_SERVER_ERROR',
            }),
            message: makeStringSchema({
              description: 'A brief description of the error if one is available',
              example: 'Malformed input',
            }),
            stack: makeStringSchema({
              description:
                'A trace of which functions were called, in what order, from which line and file',
            }),
            statusCode: makeIntegerSchema({
              description: 'The http status code',
              example: props.code ?? 500,
            }),
            details: makeObjectSchema({
              description:
                'Additional information about this error, which can help to understand it better',
              example: props.details ?? {},
              properties: props.details ?? {},
            }),
          },
        }),
      },
    }),
  },
});
