import getAllUsers from '../get-all-users-schema';

const makeSut = () => ({ sut: getAllUsers });

describe(getAllUsers.name, () => {
  it('returns the query, means its success ', async () => {
    const { sut } = makeSut();
    const query = {
      page: '1',
      limit: '10',
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

  it('throws an error if page not passed', async () => {
    const { sut } = makeSut();
    const query = {
      limit: '10',
    };
    try {
      await sut(query);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if page is 0', async () => {
    const { sut } = makeSut();
    const query = {
      page: '0',
    };
    try {
      await sut(query);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if page or limit contains characters which are not in [0-9]', async () => {
    const { sut } = makeSut();
    const query = {
      page: '5e',
      limit: 'a5',
    };
    try {
      await sut(query);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });
});
