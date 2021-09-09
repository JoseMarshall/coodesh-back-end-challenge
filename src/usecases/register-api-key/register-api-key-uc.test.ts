/* eslint-disable no-underscore-dangle */
import {
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../server-test-suite/utils';
import registerApiKeyValidator from '../../../server-test-suite/validations/schemas/http-response/api-key/register';
import customErrorValidator from '../../../server-test-suite/validations/schemas/http-response/errors/custom-error';
import { ApiKey } from '../../constants';
import { registerApiKeyUC } from './index';

const makeSut = () => ({
  sut: registerApiKeyUC,
});

describe(`${registerApiKeyUC.name} use-case`, () => {
  const { sut } = makeSut();

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should registe a new api key with given hostname', async () => {
    const req = { headers: { host: '192.168.1.1:8080' } };
    const result = await makeSutRequest(sut(), req);
    const validated = await registerApiKeyValidator(result.payload);

    expect(validated).toBeDefined();
    expect(result.payload[ApiKey.Host]).toEqual(req.headers.host);
  });

  it('should receive a custom error due to not found hostname', async () => {
    try {
      throw await makeSutRequest(sut(), {});
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
    }
  });
});
