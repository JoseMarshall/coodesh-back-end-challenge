/* eslint-disable no-underscore-dangle */
import collections from '../../../server-test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../server-test-suite/utils';
import deleteUserValidator from '../../../server-test-suite/validations/schemas/http-response/user/delete-one-user';
import { CollectionNames, Common } from '../../constants';
import { UserModel } from '../../main/external/repositories/mongodb/models';
import { deleteOneUserUC } from './index';

const makeSut = () => ({
  sut: deleteOneUserUC,
});

describe(`${deleteOneUserUC.name} use-case`, () => {
  const { sut } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(UserModel, CollectionNames.Users);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should delete the specified user', async () => {
    const user = collections[CollectionNames.Users][0];
    const query = { [Common.MongoId]: user[Common.MongoId] };
    const result = await makeSutRequest(sut(), query);
    const validated = await deleteUserValidator(result.payload);

    expect(validated).toBeDefined();
  });

  it('should receive a an object with deletedCount 0, due to not found user', async () => {
    const query = {
      [Common.MongoId]: '7a51a5a5-9e10-45e5-a293-3d33eaf660e4',
    };
    const result = await makeSutRequest(sut(), query);
    expect(result.payload).toEqual({ n: 0, ok: 1, deletedCount: 0 });
  });
});
