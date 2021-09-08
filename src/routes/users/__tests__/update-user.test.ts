import collections from '../../../../server-test-suite/entities-collections';
import {
  apiRequest,
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../server-test-suite/utils';
import { MsgBodyErrorValidator } from '../../../../server-test-suite/validations/schemas/http-response/errors/custom-error';
import updateUserValidator from '../../../../server-test-suite/validations/schemas/http-response/user/update-user';
import {
  ApiKey,
  ApiMessages,
  CollectionNames,
  Common,
  Headers,
  Name,
  User,
} from '../../../constants';
import { ApiKeyModel, UserModel } from '../../../main/external/repositories/mongodb/models';

describe('Method PUT /users/:userId should remove a user', () => {
  const user = collections.users[0];
  const updatingField = {
    [User.Name]: {
      [Name.Title]: 'Miss',
      [Name.First]: 'Jane',
      [Name.Last]: 'Doe',
    },
  };
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

  it('should return a 201 code response and a message', async () => {
    const response = await apiRequest
      .put(`/users/${user[Common.MongoId]}`)
      .set({ [Headers.APIKEY]: apikeys[2][ApiKey.Apikey], [Headers.Host]: apikeys[2][ApiKey.Host] })
      .send(updatingField);
    const validated = await updateUserValidator(response.body.payload);

    expect(response.status).toBe(201);
    expect(validated).toBeDefined();
    expect(response.body.msg).toContain(ApiMessages.UpdatingEntitySuccess);
  });

  it('should return a 404 code response due to not found user', async () => {
    const response = await apiRequest
      .put(`/users/fd616d46-39b6-458d-a2c2-c306938cc320`)
      .set({
        [Headers.APIKEY]: apikeys[3][ApiKey.Apikey],
        [Headers.Host]: apikeys[3][ApiKey.Host],
      })
      .send(updatingField);
    const validated = await MsgBodyErrorValidator(response.body);
    expect(response.status).toBe(404);
    expect(response.body.msg).toContain(ApiMessages.UpdatingEntityError);
    expect(validated).toBeDefined();
  });

  it('should return a 403 due to api key not not valid', async () => {
    const response = await apiRequest
      .put(`/users/${user[Common.MongoId]}`)
      .set({
        [Headers.APIKEY]: 'c4jhi642ci4f96eoe3xv6hsg2gzvb5',
        [Headers.Host]: apikeys[3][ApiKey.Host],
      })
      .send(updatingField);
    expect(response.status).toBe(403);
  });
});
