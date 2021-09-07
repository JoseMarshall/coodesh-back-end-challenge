import colletions from '../../../../../../../server-test-suite/entities-collections';
import {
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../server-test-suite/utils';
import userValidator from '../../../../../../../server-test-suite/validations/schemas/http-response/user/get-one-user';
import { makeUser } from '../../../../../../entities/user';
import { UserModel } from '../../models';
import { makeCreateBulkEntity } from '../index';

const makeSut = (model = UserModel) => ({
  sut: makeCreateBulkEntity,
  model,
});

describe(makeCreateBulkEntity.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
    await dropDatabase();
  });

  it('should create a user in mongodb user collection', async () => {
    const newUser = makeUser(colletions.users[0]);

    const result = await makeSutRequest(sut({ model }), [newUser]);
    const validated = await userValidator(result[0].toJSON());
    expect(validated).toBeDefined();
  });

  it('should get an error due to invalid body request', async () => {
    const newUser = {};
    try {
      await makeSutRequest(sut({ model }), [newUser]);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
