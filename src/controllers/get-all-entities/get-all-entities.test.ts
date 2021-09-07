import { makeSutRequest } from '../../../server-test-suite/utils';
import makeGetAllEntityController from '.';

const mockGetAllDependency = jest
  .fn()
  .mockImplementation(query => Promise.resolve({ payload: { query } }));

const mockRequestValidatorDependency = jest
  .fn()
  .mockImplementation(async req => Promise.resolve(req.query));

const makeSut = (
  findAll = mockGetAllDependency,
  requestValidator = mockRequestValidatorDependency
) => ({
  sut: makeGetAllEntityController,
  findAll,
  requestValidator,
});

describe(`${makeGetAllEntityController.name} Controller`, () => {
  const { sut, findAll, requestValidator } = makeSut();

  it('should receive a 200 status code and the dependencies should be called with the correct data', async () => {
    const req = { query: { anyField1: 'anyValue1' } };
    const result = await makeSutRequest(sut({ findAll, requestValidator }), req);

    expect(result.status).toBe(200);
    expect(mockGetAllDependency).toHaveBeenCalledWith(req.query);
    expect(mockRequestValidatorDependency).toHaveBeenCalledWith(req);
  });
});
