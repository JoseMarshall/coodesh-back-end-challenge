import colletions from '../../../../../../../server-test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../server-test-suite/utils';
import { CollectionNames, Common } from '../../../../../../constants';
import { UserModel } from '../../models';
import { makeExistsEntity } from '../index';

const makeSut = (model = UserModel) => ({
  sut: makeExistsEntity,
  model,
});

describe(makeExistsEntity.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(UserModel, CollectionNames.Users);
  });

  afterAll(async () => {
    await disconnect();
    await dropDatabase();
  });

  it('should find a user from mongodb user collection', async () => {
    const user = colletions.users[0];

    const result = await makeSutRequest(sut({ model }), { [Common.MongoId]: user[Common.MongoId] });
    expect(result).toBe(true);
  });

  it('should not find a user from mongodb user collection', async () => {
    const result = await makeSutRequest(sut({ model }), { [Common.MongoId]: 'nonexistent userId' });
    expect(result).toBe(false);
  });
});
