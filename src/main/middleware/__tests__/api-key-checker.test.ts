import { Request, Response } from 'express';

import collections from '../../../../server-test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../server-test-suite/utils';
import { CollectionNames } from '../../../constants';
import { ApiKeyModel } from '../../external/repositories/mongodb/models';
import { validateApiKey } from '../api-key-checker';

const makeRequestObject = ({ host, apiKey }) =>
  ({
    hostname: host,
    header: jest.fn().mockReturnValue(apiKey),
  } as unknown as Request);

const makeSut = ({ req = makeRequestObject(collections.apikeys[0]) }) => {
  const json = jest.fn();
  const next = jest.fn();
  const status = jest.fn().mockReturnValue({ json });

  return {
    sut: validateApiKey(
      req,
      {
        status,
      } as unknown as Response,
      next
    ),
    next,
    status,
    json,
  };
};

describe(validateApiKey.name, () => {
  beforeAll(async () => {
    await connect();
    await collectionInit(ApiKeyModel, CollectionNames.ApiKeys);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should increment the usage of api key', async () => {
    const { next, sut } = makeSut({});
    await sut;
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should add new usage of api key', async () => {
    const { next, sut } = makeSut({ req: makeRequestObject(collections.apikeys[2]) });
    await sut;
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call status with 429 due to max api key usage exceeded', async () => {
    const { status, sut } = makeSut({
      req: makeRequestObject(collections.apikeys[1]),
    });
    await sut;
    expect(status).toHaveBeenCalledWith(429);
  });

  it('should call status with 403 due to api key undefined', async () => {
    const { status, sut } = makeSut({
      req: { host: 'localhost' } as any,
    });
    await sut;
    expect(status).toHaveBeenCalledWith(403);
  });
});
