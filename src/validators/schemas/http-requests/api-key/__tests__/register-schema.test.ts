import apiKeyRegisterSchema from '../register-schema';

const makeSut = () => ({ sut: apiKeyRegisterSchema });

describe(apiKeyRegisterSchema.name, () => {
  it('returns the query, means its success ', async () => {
    const { sut } = makeSut();
    const query = {};
    const result = await sut(query);
    expect(result).toEqual(query);
  });

  it('throws an error if unknown keys passed', async () => {
    const { sut } = makeSut();
    const query = {
      unknownKey: 'any_value',
    };
    try {
      await sut(query);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });
});
