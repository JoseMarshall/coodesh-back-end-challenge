import {
  makeGeneralResponseBodySchema,
  makeIntegerSchema,
  makeObjectSchema,
  makeStringSchema,
} from '../../../builders';

// eslint-disable-next-line import/prefer-default-export
export const deleteOneUserResponseBodySchema = makeGeneralResponseBodySchema(
  {
    n: makeIntegerSchema({ example: 1 }),
    opTime: makeObjectSchema({
      properties: {
        ts: makeStringSchema({ example: '7004544472352555009' }),
        t: makeIntegerSchema({ example: 101 }),
      },
      required: ['ts', 't'],
    }),
    electionId: makeStringSchema({ example: '7fffffff0000000000000065' }),
    ok: makeIntegerSchema({ example: 1 }),
    $clusterTime: makeObjectSchema({
      required: ['clusterTime', 'signature'],
      properties: {
        clusterTime: makeStringSchema({ example: '7004544472352555009' }),
        signature: makeObjectSchema({
          required: ['hash', 'keyId'],
          properties: {
            hash: makeStringSchema({ example: 'q0cWeOXz1DzdrFUK6TDsNt8nIjQ=' }),
            keyId: makeStringSchema({ example: '6961454422681452546' }),
          },
        }),
      },
    }),
    operationTime: makeStringSchema({ example: '7004544472352555009' }),
    deletedCount: makeIntegerSchema({ example: 1 }),
  },
  ['n', 'opTime', 'electionId', 'ok', '$clusterTime', 'operationTime', 'deletedCount']
);
