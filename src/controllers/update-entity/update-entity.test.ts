import { makeSutRequest } from '../../../server-test-suite/utils';
import makeUpdateEntityController from '.';

const mockUpdateDependency = jest.fn().mockImplementation(async _req =>
  Promise.resolve({
    payload: { updated: true, msg: 'updated_entity' },
  })
);

const mockRequestValidatorDependency = jest
  .fn()
  .mockImplementation(async req => Promise.resolve(req));

const makeSut = (
  update = mockUpdateDependency,
  requestValidator = mockRequestValidatorDependency
) => ({
  sut: makeUpdateEntityController,
  update,
  requestValidator,
});

describe(`${makeUpdateEntityController.name} controller`, () => {
  const { sut, update, requestValidator } = makeSut();

  it('should receive a 201 status code and dependency should de called with given data', async () => {
    const req = {
      query: { id: '1234567890' },
      body: { anyField1: 'anyValue1', anyField2: 'anyValue2' },
    };
    const result = await makeSutRequest(sut({ update, requestValidator }), req);

    expect(result.status).toBe(201);
    expect(result.body).toEqual({ updated: true, msg: 'updated_entity' });
    expect(mockUpdateDependency).toHaveBeenCalledWith(req);
    expect(mockRequestValidatorDependency).toHaveBeenCalledWith(req);
  });
});
