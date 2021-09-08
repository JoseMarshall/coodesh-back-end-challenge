import collections from '../../../../server-test-suite/entities-collections';
import {
  apiRequest,
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../server-test-suite/utils';
import { MsgBodyErrorValidator } from '../../../../server-test-suite/validations/schemas/http-response/errors/custom-error';
import { ApiKey, ApiMessages, CollectionNames, Common, Headers } from '../../../constants';
import { ApiKeyModel, UserModel } from '../../../main/external/repositories/mongodb/models';

describe('Method DELETE /users/:userId should remove a user', () => {
  const user = collections.users[0];
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
      .delete(`/users/${user[Common.MongoId]}`)
      .set({ [Headers.APIKEY]: apikeys[2][ApiKey.Apikey], [Headers.Host]: apikeys[2][ApiKey.Host] })
      .send();
    expect(response.status).toBe(200);
    expect(response.body.msg).toContain(ApiMessages.DeletingEntitySuccess);
  });

  it('should return a 404 code response due to not found user', async () => {
    const response = await apiRequest
      .delete(`/users/fd616d46-39b6-458d-a2c2-c306938cc320`)
      .set({
        [Headers.APIKEY]: apikeys[3][ApiKey.Apikey],
        [Headers.Host]: apikeys[3][ApiKey.Host],
      })
      .send();
    const validated = await MsgBodyErrorValidator(response.body);
    expect(response.status).toBe(404);
    expect(response.body.msg).toContain(ApiMessages.DeletingEntityError);
    expect(validated).toBeDefined();
  });

  it('should return a 403 due to api key not not valid', async () => {
    const response = await apiRequest
      .delete(`/users/${user[Common.MongoId]}`)
      .set({
        [Headers.APIKEY]: 'c4jhi642ci4f96eoe3xv6hsg2gzvb5',
        [Headers.Host]: apikeys[3][ApiKey.Host],
      })
      .send();
    expect(response.status).toBe(403);
  });
});
