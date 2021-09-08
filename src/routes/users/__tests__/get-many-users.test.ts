import collections from '../../../../server-test-suite/entities-collections';
import {
  apiRequest,
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../server-test-suite/utils';
import { MsgBodyErrorValidator } from '../../../../server-test-suite/validations/schemas/http-response/errors/custom-error';
import getAllUsersValidator from '../../../../server-test-suite/validations/schemas/http-response/user/get-all-users';
import { ApiKey, CollectionNames, Headers } from '../../../constants';
import { ApiKeyModel, UserModel } from '../../../main/external/repositories/mongodb/models';

describe('Method GET /users should list users', () => {
  const { apikeys } = collections;
  beforeAll(async () => {
    await connect();
    await collectionInit(UserModel, CollectionNames.Users);
    await collectionInit(ApiKeyModel, CollectionNames.ApiKeys);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 200 code response and a message', async () => {
    const response = await apiRequest
      .get(`/users`)
      .set({ [Headers.APIKEY]: apikeys[2][ApiKey.Apikey], [Headers.Host]: apikeys[2][ApiKey.Host] })
      .query({ page: '1', limit: '3' })
      .send();
    const validated = await getAllUsersValidator(response.body.payload);
    expect(response.status).toBe(200);
    expect(validated).toBeDefined();
  });

  it('should return a 422 since page is not valid', async () => {
    const response = await apiRequest
      .get(`/users`)
      .set({ [Headers.APIKEY]: apikeys[3][ApiKey.Apikey], [Headers.Host]: apikeys[3][ApiKey.Host] })
      .query({ page: 'abc', limit: '3' })
      .send();
    const validated = await MsgBodyErrorValidator(response.body);

    expect(response.status).toBe(422);
    expect(validated).toBeDefined();
  });

  it('should return a 403 due to api key not not valid', async () => {
    const response = await apiRequest
      .get(`/users`)
      .set({
        [Headers.APIKEY]: 'c4jhi642ci4f96eoe3xv6hsg2gzvb5',
        [Headers.Host]: apikeys[3][ApiKey.Host],
      })
      .query({ page: '1', limit: '3' })
      .send();
    expect(response.status).toBe(403);
  });
});
