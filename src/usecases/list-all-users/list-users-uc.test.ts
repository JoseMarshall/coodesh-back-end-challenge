/* eslint-disable no-underscore-dangle */
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../server-test-suite/utils';
import getAllUsersValidator from '../../../server-test-suite/validations/schemas/http-response/user/get-all-users';
import { CollectionNames } from '../../constants';
import { UserModel } from '../../main/external/repositories/mongodb/models';
import { listAllUsersUC } from './index';

const makeSut = () => ({
  sut: listAllUsersUC,
});

describe(`${listAllUsersUC.name} use-case`, () => {
  const { sut } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(UserModel, CollectionNames.Users);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should receive a user object which obey the getAllUsersValidator', async () => {
    const result = await makeSutRequest(sut(), { page: 1, limit: 3 });
    const validated = await getAllUsersValidator(result.payload);
    expect(validated).toBeDefined();
  });
});
