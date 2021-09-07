import joi from 'joi';

import { makeSutRequest } from '../../../server-test-suite/utils';
import customErrorValidator from '../../../server-test-suite/validations/schemas/http-response/errors/custom-error';
import JoiValidator from '../index';

const exampleSchema = joi.object({ valid: joi.boolean().required() }).unknown(false).required();

const mockValidateAsyncThrow = jest.fn().mockImplementation(async () => {
  throw new Error();
});

const mockFailingSchema = { validateAsync: mockValidateAsyncThrow } as any;

const makeSut = (schema = exampleSchema) => ({
  sut: JoiValidator,
  schema,
});

describe(JoiValidator.name, () => {
  it('should return the entry value, means its valid ', async () => {
    const { sut, schema } = makeSut();
    const value = { valid: true };
    const result = await makeSutRequest(sut(schema), value);

    expect(result).toEqual(value);
  });

  it('should throw a custom error due to no matching schema (passed empty object)', async () => {
    const { sut, schema } = makeSut();
    const value = {};
    try {
      await makeSutRequest(sut(schema), value);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
      expect(error.statusCode).toBe(422);
    }
  });

  it('should throw a custom error due to no matching schema (passed unknown key)', async () => {
    const { sut, schema } = makeSut();
    const value = { valid: true, unknownKey: 'foo' };
    try {
      await makeSutRequest(sut(schema), value);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
      expect(error.statusCode).toBe(422);
    }
  });

  it('should throw a custom error due to no matching schema (passed not valid value )', async () => {
    const { sut, schema } = makeSut();
    const value = { valid: 'not-valid-value' };
    try {
      await makeSutRequest(sut(schema), value);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
      expect(error.statusCode).toBe(422);
    }
  });

  it('should throw a custom error due to fail while validating', async () => {
    const { sut, schema } = makeSut(mockFailingSchema);
    const value = { valid: true };
    try {
      await makeSutRequest(sut(schema), value);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
      expect(error.statusCode).toBe(500);
    }
  });
});
