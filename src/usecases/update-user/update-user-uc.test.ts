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
import updateUserValidator from '../../../server-test-suite/validations/schemas/http-response/user/update-user';
import { CollectionNames, Common, Name, User } from '../../constants';
import { UserModel } from '../../main/external/repositories/mongodb/models';
import { updateUserUC } from './index';

const makeSut = () => ({
  sut: updateUserUC,
});

describe(`${updateUserUC.name} use-case`, () => {
  const { sut } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(UserModel, CollectionNames.Users);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should update the user name', async () => {
    const user = collections[CollectionNames.Users][0];
    const updatingFields = {
      [User.Name]: {
        [Name.Title]: 'Mr',
        [Name.First]: 'John',
        [Name.Last]: 'Doe',
      },
    };

    const req = { params: { [Common.MongoId]: user[Common.MongoId] }, body: updatingFields };
    const result = await makeSutRequest(sut(), req);
    const validated = await updateUserValidator(result.payload);

    expect(validated).toBeDefined();
    expect(result.payload[User.Name]).toEqual(updatingFields.name);
  });

  it('should receive a custom error due to not found user', async () => {
    const updatingFields = {
      [User.Name]: {
        [Name.Title]: 'Miss',
        [Name.First]: 'Jane',
        [Name.Last]: 'Doe',
      },
    };

    const req = {
      params: { [Common.MongoId]: '7a51a5a5-9e10-45e5-a293-3d33eaf660e4' },
      body: updatingFields,
    };
    try {
      throw await makeSutRequest(sut(), req);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
    }
  });
});
