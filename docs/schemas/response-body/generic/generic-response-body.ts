import { makeObjectSchema, makeStringSchema } from '../../../builders';

// eslint-disable-next-line import/prefer-default-export
export const genericResponseBodySchema = makeObjectSchema({
  required: ['msg'],
  properties: {
    msg: makeStringSchema({
      example: 'REST Back-end Challenge 20201209 Running',
      description: 'The default message server returns when client hit this end-point',
    }),
  },
});
