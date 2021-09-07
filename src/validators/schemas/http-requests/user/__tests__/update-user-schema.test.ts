import { Common, Genders, Name, User } from '../../../../../constants';
import updateUser from '../update-user-schema';

const makeSut = () => ({ sut: updateUser });

describe(updateUser.name, () => {
  it('returns the req, means its success ', async () => {
    const { sut } = makeSut();
    const req = {
      body: {
        [User.Name]: {
          [Name.Title]: 'Mr',
          [Name.First]: 'John',
          [Name.Last]: 'Doe',
        },
        [User.Gender]: Genders.Male,
      },
      params: { [Common.MongoId]: 'fd616d46-39b6-458d-a2c2-c306938cc320' },
    };
    const result = await sut(req);
    expect(result).toEqual(req);
  });

  it('throws an error if no body and no params is passed', async () => {
    const { sut } = makeSut();
    try {
      await sut({});
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if at least one field is not valid', async () => {
    const { sut } = makeSut();
    const req = {
      body: {
        [User.Name]: {
          [Name.Title]: 'Mr',
          [Name.First]: 'John',
          [Name.Last]: 'Doe',
        },
      },
      params: { [Common.MongoId]: 'invalid-value' },
    };
    try {
      await sut(req);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if unknown keys passed', async () => {
    const { sut } = makeSut();
    const req = {
      body: {
        [User.Name]: {
          [Name.Title]: 'Mr',
          [Name.First]: 'John',
          [Name.Last]: 'Doe',
        },
        anyUnknownKey: 'any-value',
      },
      params: { [Common.MongoId]: 'fd616d46-39b6-458d-a2c2-c306938cc320' },
    };
    try {
      await sut(req);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });
});
