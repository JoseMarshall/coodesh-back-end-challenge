import { Common } from '../../../../../constants';
import getOneUser from '../get-one-user-schema';

const makeSut = () => ({ sut: getOneUser });

describe(getOneUser.name, () => {
  it('returns the query, means its success ', async () => {
    const { sut } = makeSut();
    const query = {
      [Common.MongoId]: '9a00c436-2d82-4bfb-ab9e-a13aa916a3c2',
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
      [Common.MongoId]: '9a00c436-2d82-4bfb-ab9e-a13aa916a3c2',
      unknownKey: 'any_value',
    };
    try {
      await sut(query);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });
});
