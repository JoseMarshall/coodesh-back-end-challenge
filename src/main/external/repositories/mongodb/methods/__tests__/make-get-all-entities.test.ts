import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../server-test-suite/utils';
import getAllUsersValidator from '../../../../../../../server-test-suite/validations/schemas/http-response/user/get-all-users';
import { CollectionNames, Common, Genders, User } from '../../../../../../constants';
import { formatQueryToRegex } from '../../helpers/query-formatters';
import { UserModel } from '../../models';
import { makeGetAllEntities } from '../index';

const makeSut = (model = UserModel) => ({
  sut: makeGetAllEntities,
  model,
});

describe(makeGetAllEntities.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(UserModel, CollectionNames.Users);
  });

  afterAll(async () => {
    await disconnect();
    await dropDatabase();
  });

  it('should get 2 users', async () => {
    const query = {
      page: '1',
      limit: '2',
    };
    const result = await makeSutRequest(
      sut({
        model,
        options: {},
      }),
      query
    );

    const validated = await getAllUsersValidator(result);
    expect(result.data.length).toBe(2);
    expect(validated).toBeDefined();
  });

  it('should get only female users', async () => {
    const query = {
      page: '1',
      limit: '3',
      [User.Gender]: Genders.Female,
    };

    const result = await makeSutRequest(
      sut({
        model,
        options: { formatQuery: formatQueryToRegex },
      }),
      query
    );

    const validated = await getAllUsersValidator(result);
    expect(validated).toBeDefined();
    expect(result.data.some((user: any) => user[User.Gender] === Genders.Male)).toBe(false);
  });

  it('should get users, but project only the name', async () => {
    const query = {
      page: '1',
      limit: '1',
    };

    const result = await makeSutRequest(
      sut({
        model,
        options: {
          projection: {
            [User.Name]: 1,
            [Common.MongoId]: 0,
          },
        },
      }),
      query
    );
    expect(Object.keys(result.data[0])).toEqual([User.Name]);
  });
});
