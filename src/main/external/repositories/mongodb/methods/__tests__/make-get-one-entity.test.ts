import colletions from '../../../../../../../server-test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../server-test-suite/utils';
import getUserValidator from '../../../../../../../server-test-suite/validations/schemas/http-response/user/get-one-user';
import { CollectionNames, Common } from '../../../../../../constants';
import { UserModel } from '../../models';
import { makeGetOneEntity } from '../index';

const makeSut = (model = UserModel) => ({
  sut: makeGetOneEntity,
  model,
});

describe(makeGetOneEntity.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(UserModel, CollectionNames.Users);
  });

  afterAll(async () => {
    await disconnect();
    await dropDatabase();
  });

  it('should get a user from mongodb user collection', async () => {
    const user = colletions.users[0];

    const result = await makeSutRequest(sut({ model, options: {} }), {
      [Common.MongoId]: user[Common.MongoId],
    });
    const validated = await getUserValidator(result);
    expect(validated).toBeDefined();
  });

  it('should get an error due to user not found', async () => {
    try {
      await makeSutRequest(sut({ model, options: {} }), {
        [Common.MongoId]: 'nonexistent user id',
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
