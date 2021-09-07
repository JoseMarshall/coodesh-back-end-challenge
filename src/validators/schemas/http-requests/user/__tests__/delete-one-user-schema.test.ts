import { Common } from '../../../../../constants';
import deleteUser from '../delete-one-user-schema';

const makeSut = () => ({ sut: deleteUser });

describe(deleteUser.name, () => {
  it('returns the query, means its success ', async () => {
    const { sut } = makeSut();
    const query = {
      [Common.MongoId]: 'fd616d46-39b6-458d-a2c2-c306938cc320',
    };
    const result = await sut(query);
    expect(result).toEqual(query);
  });

  it('throws an error if no query is passed', async () => {
    const { sut } = makeSut();
    try {
      await sut({});
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if unknown keys passed', async () => {
    const { sut } = makeSut();
    const query = {
      [Common.MongoId]: 'fd616d46-39b6-458d-a2c2-c306938cc320',
      unknownKey: 'any_value',
    };
    try {
      await sut(query);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });
});
