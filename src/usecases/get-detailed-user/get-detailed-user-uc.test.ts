/* eslint-disable no-underscore-dangle */
import collections from '../../../server-test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../server-test-suite/utils';
import customErrorValidator from '../../../server-test-suite/validations/schemas/http-response/errors/custom-error';
import getOneUserValidator from '../../../server-test-suite/validations/schemas/http-response/user/get-one-user';
import { CollectionNames, Common } from '../../constants';
import { UserModel } from '../../main/external/repositories/mongodb/models';
import { getDetailedUserUC } from './index';

const makeSut = () => ({
  sut: getDetailedUserUC,
});

describe(`${getDetailedUserUC.name} use-case`, () => {
  const { sut } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(UserModel, CollectionNames.Users);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should receive a user object which obey the getOneUserValidator', async () => {
    const user = collections[CollectionNames.Users][0];

    const query = { [Common.MongoId]: user[Common.MongoId] };
    const result = await makeSutRequest(sut(), query);
    const validated = await getOneUserValidator(result.payload);

    expect(validated).toBeDefined();
  });

  it('should receive a custom error due to not found user', async () => {
    const query = { [Common.MongoId]: '7a51a5a5-9e10-45e5-a293-3d33eaf660e4' };

    try {
      throw await makeSutRequest(sut(), query);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
    }
  });
});
