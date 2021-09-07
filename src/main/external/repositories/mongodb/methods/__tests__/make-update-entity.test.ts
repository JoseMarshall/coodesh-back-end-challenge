import colletions from '../../../../../../../server-test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../server-test-suite/utils';
import updateUserValidator from '../../../../../../../server-test-suite/validations/schemas/http-response/user/update-user';
import { CollectionNames, Common, Genders, Name, User } from '../../../../../../constants';
import { UserModel } from '../../models';
import { makeUpdateOneEntity } from '../index';

const makeSut = (model = UserModel) => ({
  sut: makeUpdateOneEntity,
  model,
});

describe(makeUpdateOneEntity.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(UserModel, CollectionNames.Users);
  });

  afterAll(async () => {
    await disconnect();
    await dropDatabase();
  });

  it('should update the name and gender of the user', async () => {
    const user = colletions.users[0];

    const updatingFields = {
      [User.Name]: {
        [Name.Title]: 'Mr',
        [Name.First]: 'John',
        [Name.Last]: 'Doe',
      },
      [User.Gender]: Genders.Male,
    };
    const result = await makeSutRequest(
      sut({ model }),
      {
        [Common.MongoId]: user[Common.MongoId],
      },
      updatingFields
    );
    const validated = await updateUserValidator(result);
    expect(validated).toBeDefined();
    expect(result[User.Name]).toEqual(updatingFields[User.Name]);
  });

  it('should get an error due to user not found', async () => {
    try {
      await makeSutRequest(
        sut({ model }),
        {
          [Common.MongoId]: 'nonexistent user id',
        },
        { [User.Gender]: Genders.Male }
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
