/* eslint-disable no-underscore-dangle */
import { makeSutRequest } from '../../../server-test-suite/utils';
import makeGetOneEntityController from '.';

const mockGetOneDependency = jest
  .fn()
  .mockImplementation(async query => Promise.resolve({ payload: { id: query.id } }));

const mockRequestValidatorDependency = jest
  .fn()
  .mockImplementation(async req => Promise.resolve(req.query));

const makeSut = (
  findOne = mockGetOneDependency,
  requestValidator = mockRequestValidatorDependency
) => ({
  sut: makeGetOneEntityController,
  findOne,
  requestValidator,
});

describe(`${makeGetOneEntityController.name} Controller`, () => {
  const { sut, findOne, requestValidator } = makeSut();

  it('should receive a 200 status code and call the dependencies with given data', async () => {
    const req = { query: { id: '1234567890' } };
    const result = await makeSutRequest(sut({ findOne, requestValidator }), req);
    expect(result.status).toBe(200);
    expect(mockGetOneDependency).toHaveBeenCalledWith(req.query);
    expect(mockRequestValidatorDependency).toHaveBeenCalledWith(req);
  });
});
