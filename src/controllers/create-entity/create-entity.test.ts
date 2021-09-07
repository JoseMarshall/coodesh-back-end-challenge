import { makeSutRequest } from '../../../server-test-suite/utils';
import makeCreateEntityController from './index';

const mockCreateDependency = jest.fn().mockImplementation(async body =>
  Promise.resolve({
    payload: {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
);

const mockRequestValidatorDependency = jest
  .fn()
  .mockImplementation(async req => Promise.resolve(req.body));

const makeSut = (
  create = mockCreateDependency,
  requestValidator = mockRequestValidatorDependency
) => ({
  sut: makeCreateEntityController,
  create,
  requestValidator,
});

describe(`${makeCreateEntityController.name} Controller`, () => {
  const { sut, create, requestValidator } = makeSut();

  it('should receive a 201 status code and call the dependency with the validated data', async () => {
    const req = {
      body: { anyField1: 'anyValue1', anyField2: 'anyValue2' },
    };

    const result = await makeSutRequest(sut({ create, requestValidator }), req);
    expect(result.status).toBe(201);
    expect(mockCreateDependency).toHaveBeenCalledWith(req.body);
    expect(mockRequestValidatorDependency).toHaveBeenCalledWith(req);
  });
});
